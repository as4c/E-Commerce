from django.contrib.auth.models import BaseUserManager

#  Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, password2 = None, **extra_kwargs):
        """
        Creates and saves a User with the given email,ans username.
        """
        if not email:
            raise ValueError('email is required.')
        if not username:
            raise ValueError('username is required.')

        user = self.model(
            email=self.normalize_email(email),
            username = username,
            **extra_kwargs
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password=None, **extra_kwargs):
        """
        Creates and saves a superuser with the given email.
        """
        extra_kwargs.setdefault('is_staff', True)
        extra_kwargs.setdefault('is_admin', True)
        extra_kwargs.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_kwargs)
