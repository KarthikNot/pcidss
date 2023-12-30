"use client"

import { Label } from '@/components/ui/label';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow
} from '@/components/ui/table';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { a, b, c, p2pe } from '../../../data/questions';
import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function Questionnaire({ params }: { params: { type: string } }) {
    const questionMap : { [key: string]: string[] } = {
        'a': a,
        'b': b,
        'c': c,
        'p2pe': p2pe
    }
    const questions: string[] = questionMap[params.type]
    const [checkedStates, setCheckedStates] = useState(Array(questions.length).fill(""))
    const [autofill, setAutofill] = useState(true)

    const answeredAll = useCallback(() => {
        return checkedStates.every((c) => c !== "");
    }, [checkedStates]);

    const handleSubmit = () => {
        const triggerAlertElement = document.getElementById("triggerAlertQuestionnaire");
        if (!answeredAll() && triggerAlertElement) 
            triggerAlertElement.click();
    }

    useEffect(() => {
        const handleBeforeUnload = (event: BeforeUnloadEvent) => {
            const confirmationMessage = 'Are you sure you want to leave? Your progress will be lost.'
            event.returnValue = confirmationMessage
            return confirmationMessage
        };

        window.addEventListener('beforeUnload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeUnload', handleBeforeUnload);
        };
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-12 w-100 pt-0">
            <div className="flex m-5">
                <div className="flex flex-col items-center justify-center">
                    <Label className="font-bold opacity-50 p-5">Questionnaire {params.type.toUpperCase()}</Label>
                    <div className="flex m-3 items-center justify-center">
                        <Label className="font-medium opacity-35 m-2">Auto Fill</Label>
                        <Switch checked={autofill} onCheckedChange={() => {setAutofill(!autofill)}}/>
                    </div>
                    <Table className="w-100">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[8vw]">Q. No.</TableHead>
                                <TableHead className="w-[85vw]">Question</TableHead>
                                <TableHead className="w-[18vw]">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {questions.map((q, i) => (
                            <TableRow key={q}>
                                <TableCell className="font-medium">{i + 1}</TableCell>
                                <TableCell className="font-medium">{q}</TableCell>
                                <TableCell className="font-medium">
                                <RadioGroup className="flex flex-row gap-10" value={checkedStates[i]} onValueChange={async (e) => {
                                    const question = "Q" + (i + 1);
                                    const selected = e.toString()
                                    const saq_type = params.type

                                    const body = {
                                        question,
                                        saq_type
                                    }
                                    const response = await fetch('http://127.0.0.1:6969/autofill', {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        },
                                        body: JSON.stringify(body)
                                    })
                                    const data = await response.json()

                                    setCheckedStates(prevStates => {
                                        const newStates = [...prevStates];
                                        newStates[i] = selected;
                                        
                                        if (autofill) {
                                            data.forEach((d: number) => {
                                                if (d - 1 > i)
                                                    newStates[d - 1] = selected;
                                            });
                                        }

                                        return newStates;
                                    })
                                }}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="Yes" id="option-one"/>
                                        <Label htmlFor="option-one">Yes</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="No" id="option-two"/>
                                        <Label htmlFor="option-two">No</Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="NA" id="option-three"/>
                                        <Label htmlFor="option-three">N/A</Label>
                                    </div>
                                </RadioGroup>
                                </TableCell>
                            </TableRow>
                            ))}
                    </TableBody>
                    </Table>
                </div>
            </div>
            <div>
                <Button onClick={handleSubmit}>Submit</Button>
            </div>
            <AlertDialog>
                    <AlertDialogTrigger>
                        <div className="flex" id="triggerAlertQuestionnaire">
                        </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>You must answer all the questions.</AlertDialogTitle>
                            <AlertDialogDescription>
                                You must have all the answers to the questions before proceeding any further.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
        </main>
    )
}