const overview: string = "This report outlines the findings from the PCI DSS v4.0 Self-Assessment Questionnaire A (SAQ A) conducted for {...}. The applicability of SAQ A to the organization stems from its operational model, where all functions involving cardholder data are outsourced. Consequently, the organization does not engage in the electronic storage, processing, or transmission of any cardholder data on its systems or premises. This alignment with SAQ A's criteria is a strategic decision, reflecting the organization's commitment to data security while leveraging the expertise of specialized third-party service providers. The assessment conducted offers a comprehensive review of the organization's adherence to the stringent standards set by the PCI DSS v4.0. It delves into various aspects of the organization's practices and policies, especially concerning the management and oversight of these third-party entities. The thoroughness of the assessment ensures that every facet of the organization's operation that might impact the security of cardholder data has been scrutinized and evaluated against the established standards. This executive summary serves not only as a reflection of the organization's current compliance status with PCI DSS but also as a testament to its dedication to maintaining the highest standards of payment card security. It underscores the organization's proactive approach to data protection, an essential aspect in today's digital transaction environment."
const compliant: string = "The evaluation of {...} indicates full compliance with the PCI DSS v4.0 SAQ A requirements. This accomplishment demonstrates the organization's successful implementation of all necessary practices and procedures, ensuring robust and comprehensive protection of cardholder data in accordance with PCI standards."
const nonCompliant: string = "The assessment conducted for {...} reveals partial compliance with the requirements of PCI DSS v4.0 SAQ A. Although numerous practices and procedures align with the standards, there are specific areas where enhancements are necessary. The organization must fortify its controls in these identified domains to achieve full compliance with the PCI DSS requirements."

export const AInfo = {
    overview,
    compliant,
    nonCompliant
}