from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import User


class Profile(models.Model):

    ROLE_CHOICES = [
        ('student','Student'),
        ('teacher','Teacher'),
        ('guest','Guest'),
        ('admin','Admin'),
    ]

    owner = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='guest')
    name = models.CharField(max_length=50, blank=True)
    lastname = models.CharField(max_length=50, blank=True)
    email = models.CharField(max_length=100, blank=True)
    profileImage = models.ImageField(upload_to="profile_images/", default="default-profile.png")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.owner} profile"


def create_profile(sender, instance, created, **kwards):
    if created:
        Profile.objects.create(owner=instance)


post_save.connect(create_profile, sender=User)

