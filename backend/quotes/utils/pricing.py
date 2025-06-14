def calculate_price(quote):
    """
    Dummy price calculation logic based on revenue and employee count.
    Replace this with real Excel logic if needed.
    """

    base_price = 500  # starting base
    revenue_factor = (quote.revenue or 0) * 0.001
    employee_factor = (quote.employee_count or 0) * 10

    return round(base_price + revenue_factor + employee_factor, 2)
