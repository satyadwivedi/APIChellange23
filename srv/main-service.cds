using { com.satya as db } from '../db/schema';
using {northbreeze as external} from './external/northbreeze';

service myService {
   entity Foo {
      auth: Association to db.Authors;
      Bar : Association to db.Bar; 
   }
   entity books as projection on  db.Books;
   entity Products as projection on external.Products;
   function calculateStock(query: String(255)) returns {totalStock : Decimal(10,2)}; 
   action mySelectProduct(communityID: String(100)) returns String(255);
   action getAPIPaths() returns String(100);
   action autoExpTest(id: db.Authors:name) returns db.Authors; 
}
