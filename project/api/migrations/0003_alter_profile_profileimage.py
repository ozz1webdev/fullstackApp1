# Generated by Django 5.1.2 on 2024-10-26 09:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_profile_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='profileImage',
            field=models.ImageField(default='vc.jpg', upload_to='profile_images/'),
        ),
    ]
