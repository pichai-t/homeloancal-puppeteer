Feature: TS-003-HomeLoanCal-to-verify-a-Message_unable-to-estimate
    HomeLoanCal to verify a Message when home loan estimate is not able to be estimated
Scenario: Test Scenario 3 - TS-003_HomeLoanCal-to-verify-a-Message_unable-to-estimate
Given I open "home-loan-calculator" page
When I enter Your details column as following:
|Application Type| Number of dependants | Property you would like to buy|
|     Single     |          0           |        Home to live in        |

When I enter Your earnings column as following:
|Your income (before tax)| Your other income | 
|         0              |         0         |  

When I enter Your expenses column as following:
|Living expenses| Current home loan repayments | Other loan repayments |Other commitments | Total credit card limits | 
|      1        |              0               |          0            |        0         |           0              |

When I click on "Work out how much I could borrow" button 

Then I see a message of "estimation" as "Based on the details you've entered, we're unable to give you an estimate of your borrowing power with this calculator. For questions, call us on 1800 100 641."
