Feature: automation store
    # select any product from entire list
    # @regression
    Scenario: Select product and add products from product detail page
        Given I am on automation store home page
        When I select product 1 and add to cart
# When I select product 2 and add to cart
# When I select product 3 and add to cart
# Then I should see 3 items on item cart
