Feature: TS-002-_HomeLoanCal-to-verify-Start_over-button
    HomeLoanCal to test 'Start over' button functionality

Scenario: Test Scenario 2 - TS-002_HomeLoanCal-to-verify-Start_over-button

Given I open "home-loan-calculator" page

When I enter Your earnings column as following:
|Your income (before tax)| Your other income | 
|       80000            |       10000       |  

When I enter Your expenses column as following:
|Living expenses| Current home loan repayments | Other loan repayments |Other commitments | Total credit card limits | 
|      500      |              0               |         100           |        0         |         10000            |

When I click on "Work out how much I could borrow" button 

# Start Over: Values should be cleared
When I click on "Start over" button 

Then I see Your earnings column as following:
|Your income (before tax)| Your other income | 
|       0                |       0           |  

Then I see Your expenses column as following:
|Living expenses| Current home loan repayments | Other loan repayments |Other commitments | Total credit card limits | 
|       0       |               0              |           0           |        0         |           0              |
