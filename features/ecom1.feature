Feature: End to End commerce validation
    I want to shop on Tools QA Shopping Website
    @regression
    Scenario: Search for shirts and add to cart
        Given I am on account page for Tools QA
        When I do the search for shirts with below specifications
            | ShirtSpec  | Size | Color | Qty |
            | blue denim | 34   | Black | 2   |
            | playboy    | 40   | Grey  | 3   |
# Then I do the verification on the Cart Page that it contains "blue denim" and "playboy"

# @smokeawait page.goto('https://shop.demoqa.com/');
# Scenario: Place order for shirts
# Given I am on account page for Tools QA
# When I checkout the order items
# When I enter all the billing details and then place the order
# | BillingFirstName | BillingLastName | StreetAddress | City | PostalCode | Phone |
# | Aashish | Khetarpal | 77 | Gurgaon | 122001 | 7777777777 |
# Then I verify that order has been successfully placed
