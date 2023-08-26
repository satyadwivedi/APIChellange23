const rs = {"@odata.context":"https://services.odata.org/V4/Northwind/Northwind.svc/$metadata","value":[{"name":"Categories","kind":"EntitySet","url":"Categories"},{"name":"CustomerDemographics","kind":"EntitySet","url":"CustomerDemographics"},{"name":"Customers","kind":"EntitySet","url":"Customers"},{"name":"Employees","kind":"EntitySet","url":"Employees"},{"name":"Order_Details","kind":"EntitySet","url":"Order_Details"},{"name":"Orders","kind":"EntitySet","url":"Orders"},{"name":"Products","kind":"EntitySet","url":"Products"},{"name":"Regions","kind":"EntitySet","url":"Regions"},{"name":"Shippers","kind":"EntitySet","url":"Shippers"},{"name":"Suppliers","kind":"EntitySet","url":"Suppliers"},{"name":"Territories","kind":"EntitySet","url":"Territories"},{"name":"Alphabetical_list_of_products","kind":"EntitySet","url":"Alphabetical_list_of_products"},{"name":"Category_Sales_for_1997","kind":"EntitySet","url":"Category_Sales_for_1997"},{"name":"Current_Product_Lists","kind":"EntitySet","url":"Current_Product_Lists"},{"name":"Customer_and_Suppliers_by_Cities","kind":"EntitySet","url":"Customer_and_Suppliers_by_Cities"},{"name":"Invoices","kind":"EntitySet","url":"Invoices"},{"name":"Order_Details_Extendeds","kind":"EntitySet","url":"Order_Details_Extendeds"},{"name":"Order_Subtotals","kind":"EntitySet","url":"Order_Subtotals"},{"name":"Orders_Qries","kind":"EntitySet","url":"Orders_Qries"},{"name":"Product_Sales_for_1997","kind":"EntitySet","url":"Product_Sales_for_1997"},{"name":"Products_Above_Average_Prices","kind":"EntitySet","url":"Products_Above_Average_Prices"},{"name":"Products_by_Categories","kind":"EntitySet","url":"Products_by_Categories"},{"name":"Sales_by_Categories","kind":"EntitySet","url":"Sales_by_Categories"},{"name":"Sales_Totals_by_Amounts","kind":"EntitySet","url":"Sales_Totals_by_Amounts"},{"name":"Summary_of_Sales_by_Quarters","kind":"EntitySet","url":"Summary_of_Sales_by_Quarters"},{"name":"Summary_of_Sales_by_Years","kind":"EntitySet","url":"Summary_of_Sales_by_Years"}]};

parseEntitySet = function(data) {
    let aEntities = []
   for (key in  data.value) {
    aEntities.push(data.value[key].name)
    }
    console.log('before parse', aEntities)
    aEntities.sort((a,b)=> a-b)
    sParsedEntities = aEntities.join(',')  
    console.log('after parse', sParsedEntities)
}

parseEntitySet(rs);