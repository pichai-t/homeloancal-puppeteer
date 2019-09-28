Feature: TS-001-_HomeLoanCal-for-Single
    HomeLoanCal-for-Single, Income of $90,000, expense of $10,600 and to live in.

Scenario: Test Scenario 1 - TS-001_HomeLoanCal-for-Single

Given I open "home-loan-calculator" page
When I enter Your details column as following:
|Application Type| Number of dependants | Property you would like to buy|
|     Single     |          0           |        Home to live in        |

When I enter Your earnings column as following:
|Your income (before tax)| Your other income | 
|       80000            |       10000       |  

When I enter Your expenses column as following:
|Living expenses| Current home loan repayments | Other loan repayments |Other commitments | Total credit card limits | 
|      500      |              0               |         100           |        0         |         10000            |

When I click on "Work out how much I could borrow" button 

Then I see my borrowing estimate of "$467,000" 
