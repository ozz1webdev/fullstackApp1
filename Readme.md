# [Sokrates Backend](https://code5.ddns.net)

---

## Links

[Visit frontend site here](https://code5.ddns.net)



## Backend

### Database diagram

<img src="./Readme/Diagram.drawio.png" alt="sql flow diagram" width="800" height="600"/>

---

**Entities**

* **User:** Stores user account information.
    * Attributes:
        * id Primary Key.
        * username (CharField).
        * password (CharField).

* **Profile:** Contains detailed user profile information.
    * Attributes:
        * id Primary Key.
        * owner (OneToOneField): Foreign Key referencing User.id (one-to-one relationship).
        * first_name (CharField).
        * last_name (CharField).
        * image (ImageField).
        * created_at (DateTimeField).
        * updated_at (DateTimeField).

* **Post:** Stores user-generated content.
    * Attributes:
        * id  Primary Key.
        * owner (ForeignKey): Foreign Key referencing User.id (user who created the post).
        * title (CharField).
        * content (TextField).
        * image (ImageField).
        * created_at (DateTimeField).
        * updated_at (DateTimeField).
         
  **Comment:** Stores user comments on posts.
    * Attributes:
        * id Primary Key.
        * owner (ForeignKey): Foreign Key referencing User.id (user who created the comment).
        * post (ForeignKey): Foreign Key referencing Post.id (post being commented on).
        * content (TextField).
        * created_at (DateTimeField).
        * updated_at (DateTimeField).

### Relationships

* A User has a one-to-one relationship with a Profile.
* Only user with role "admin" can perform create Posts.
* A User can Comment on a Post.

---

### Packages

* [Django](https://www.djangoproject.com/)
* [Django REST Framework](https://www.django-rest-framework.org/)
* [Django CORS Headers](https://github.com/adamchainz/django-cors-headers)
* [Pillow](https://pypi.org/project/pillow/)
  
** Install with pip **
  
  $ pip install -r requirements.txt

## Deployment

### Heroku Configuration

* [Heroku](https://www.heroku.com/)

1. Create an app on Heroku.
2. On the Heroku app's settings page, add the following config vars:
   - `DATABASE_URL`: Your PostgreSQL server URL.
   - `SECRET_KEY`: A secret key from [Djecrety](https://djecrety.ir/).
   - `DISABLE_COLLECTSTATIC`: `1`.
   - `CLOUDINARY_URL`: Your Cloudinary API environment variable if used.