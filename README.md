# Api Documentation

1. User Registration
Endpoint : api/users/register
Type: POST
Params : email,password


2. User Login (email+password)
Endpoint : api/users/login
Type: POST
Params : email , password

3. User Social Login (Facebook)
Endpoint : api/users/fb/login
Type : POST
Params : fbId( delivered from Frontend using Facebook login api) , usertype , email , accesstoken
Auth Token required : true

4. User Social Login (Google)
Endpoint : api/users/google/login
Type: POST
Params : Goolge_client_id
Auth Token Required : True

5. Category (create)
Endpoint : api/classified/category
Type: POST
Params : category_name 
Auth_token required : True

6. Category (Get All)
Endpoint : api/classified/category
Type: GET 

7. Category (Get by Id) 
Endpoint : api/classified/category/:Id
Type: GET
Params : id of category

8. Category(make Featured category)
Endpoint : api/classified/category/featured/:id
Type : POST,
Params : Id of Category to be made featured

9. Category(get Featured category)
Endpoint : api/classified/category/featured
Type: GET

10. Subcategory ( Create )
Endpoint : api/classified/subcategory
Type : POST 
Params : subcategory_name , category_id
Auth Token Required : true

11. Subcategory(Get All)
Endpoint: api/classified/subcategory?cat="Category_id"
Type : GET
Params : Category_id

12. Subcategory(get by id)
Endpoint : api/classified/subcategory/:id
Type: GET
Params : id of subcategory

13. classified(create)
Endpoint : api/classified
Type: POST
Params : Subcategory_id , category_id , title , image , Content , date
Auth_token : True

14. classified(get by All)
Enpoint : api/classified
Type : GET

15. classified(get by category)
Enpoint : api/classified?cat="category_id"
Type : GET
Params : Id of category

16. classified(get by id)
Endpoint : api/classified/:id
Type : GET
Params : id of classified

17. classified featured (update)
Enpoint : api/classified/featured/:id
True : POST
Params : Id of classified to be updated to featured
Auth_token Required : true

18. classified featured (get All)
Enpoint : api/classified/featured
Type: GET