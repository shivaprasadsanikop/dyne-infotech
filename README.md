open the project open terminal hit npm install, use node js version 20 and after installing all the dependancies, type cd frontend here i have setup frontend,
now hit npm install again,wait for all the dependancies to install.
Open pgadmin 4 or posgres in your system create a data base named dyne-infotech, 
then create a schema name it anything then create a table named products use the below create statement

CREATE TABLE IF NOT EXISTS public.products
(
    product_id character varying COLLATE pg_catalog."default" NOT NULL,
    product_name text COLLATE pg_catalog."default" NOT NULL,
    category text COLLATE pg_catalog."default",
    discounted_price numeric,
    actual_price numeric,
    discount_percentage numeric(5,2),
    rating numeric(2,1),
    rating_count integer,
    about_product text COLLATE pg_catalog."default",
    user_name text COLLATE pg_catalog."default",
    review_title text COLLATE pg_catalog."default",
    review_content text COLLATE pg_catalog."default"
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.products
    OWNER to postgres;

    once table is created, go back to our project hit npm start inside dyne-infotech and now type cd frontend now again hit npm start,
    as we are starting frontend and backend both, 
    now the application will be running.use xlsx file to upload.
