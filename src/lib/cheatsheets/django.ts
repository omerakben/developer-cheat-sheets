import { CheatSheet } from "@/types/cheatsheet";

export const djangoCheatSheet: CheatSheet = {
  title: "Django Cheat Sheet",
  description:
    "Comprehensive Django framework reference with ready-to-use code samples",
  sections: [
    {
      id: "project-setup",
      title: "Project Setup",
      description: "Creating and configuring Django projects",
      examples: [
        {
          title: "Create New Project",
          description: "Setting up a new Django project and app",
          language: "bash",
          difficulty: "beginner",
          tags: ["setup", "installation", "basics"],
          code: `# Install Django
pip install django

# Create new project
django-admin startproject myproject
cd myproject

# Create new app
python manage.py startapp myapp

# Run development server
python manage.py runserver

# Create superuser
python manage.py createsuperuser

# Make migrations
python manage.py makemigrations
python manage.py migrate`,
        },
        {
          title: "Settings Configuration",
          description: "Essential settings.py configurations",
          language: "python",
          difficulty: "intermediate",
          tags: ["configuration", "settings", "security"],
          code: `# settings.py
import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Security
SECRET_KEY = 'your-secret-key-here'
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Applications
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp',  # Your custom app
]

# Database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATICFILES_DIRS = [BASE_DIR / 'static']

# Media files
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')`,
        },
      ],
    },
    {
      id: "models",
      title: "Models",
      description: "Database models and relationships",
      examples: [
        {
          title: "Basic Model Definition",
          description: "Creating models with various field types",
          language: "python",
          code: `# models.py
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = "categories"
        ordering = ['name']

    def __str__(self):
        return self.name

class Post(models.Model):
    STATUS_CHOICES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]

    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if self.status == 'published' and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)`,
        },
        {
          title: "Model Relationships",
          description: "ForeignKey, ManyToMany, and OneToOne relationships",
          language: "python",
          code: `# models.py
from django.db import models
from django.contrib.auth.models import User

# One-to-One relationship
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(max_length=500, blank=True)
    location = models.CharField(max_length=30, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)

# Many-to-Many relationship
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tag, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

# Many-to-Many with through model
class Author(models.Model):
    name = models.CharField(max_length=100)

class Book(models.Model):
    title = models.CharField(max_length=200)
    authors = models.ManyToManyField(Author, through='BookAuthor')

class BookAuthor(models.Model):
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)  # e.g., 'primary', 'contributor'
    order = models.PositiveIntegerField(default=0)`,
        },
      ],
    },
    {
      id: "views",
      title: "Views",
      description: "Function-based and class-based views",
      examples: [
        {
          title: "Function-Based Views",
          description: "Basic function-based views with different HTTP methods",
          language: "python",
          code: `# views.py
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from .models import Post, Category
from .forms import PostForm

def home(request):
    posts = Post.objects.filter(status='published').order_by('-created_at')
    return render(request, 'blog/home.html', {'posts': posts})

def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug, status='published')
    return render(request, 'blog/post_detail.html', {'post': post})

def posts_by_category(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    posts = Post.objects.filter(category=category, status='published')

    # Pagination
    paginator = Paginator(posts, 10)  # 10 posts per page
    page_number = request.GET.get('page')
    posts = paginator.get_page(page_number)

    return render(request, 'blog/category_posts.html', {
        'category': category,
        'posts': posts
    })

@login_required
def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.author = request.user
            post.save()
            messages.success(request, 'Post created successfully!')
            return redirect('post_detail', slug=post.slug)
    else:
        form = PostForm()

    return render(request, 'blog/create_post.html', {'form': form})

def api_posts(request):
    posts = Post.objects.filter(status='published').values('title', 'slug', 'created_at')
    return JsonResponse(list(posts), safe=False)`,
        },
        {
          title: "Class-Based Views",
          description: "Using Django's built-in class-based views",
          language: "python",
          code: `# views.py
from django.views.generic import (
    ListView, DetailView, CreateView, UpdateView, DeleteView
)
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.urls import reverse_lazy
from django.contrib import messages
from .models import Post, Category

class PostListView(ListView):
    model = Post
    template_name = 'blog/post_list.html'
    context_object_name = 'posts'
    paginate_by = 10

    def get_queryset(self):
        return Post.objects.filter(status='published').order_by('-created_at')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['categories'] = Category.objects.all()
        return context

class PostDetailView(DetailView):
    model = Post
    template_name = 'blog/post_detail.html'
    context_object_name = 'post'

    def get_queryset(self):
        return Post.objects.filter(status='published')

class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ['title', 'content', 'category', 'status']
    template_name = 'blog/post_form.html'

    def form_valid(self, form):
        form.instance.author = self.user
        messages.success(self.request, 'Post created successfully!')
        return super().form_valid(form)

class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ['title', 'content', 'category', 'status']
    template_name = 'blog/post_form.html'

    def test_func(self):
        post = self.get_object()
        return self.request.user == post.author

    def form_valid(self, form):
        messages.success(self.request, 'Post updated successfully!')
        return super().form_valid(form)

class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    template_name = 'blog/post_confirm_delete.html'
    success_url = reverse_lazy('post_list')

    def test_func(self):
        post = self.get_object()
        return self.request.user == post.author

    def delete(self, request, *args, **kwargs):
        messages.success(self.request, 'Post deleted successfully!')
        return super().delete(request, *args, **kwargs)`,
        },
      ],
    },
    {
      id: "urls",
      title: "URL Configuration",
      description: "URL patterns and routing",
      examples: [
        {
          title: "URL Patterns",
          description: "Configuring URLs for views and apps",
          language: "python",
          code: `# myproject/urls.py (Main project URLs)
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('blog.urls')),
    path('api/', include('api.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# blog/urls.py (App URLs)
from django.urls import path
from . import views

app_name = 'blog'

urlpatterns = [
    path('', views.PostListView.as_view(), name='post_list'),
    path('post/<slug:slug>/', views.PostDetailView.as_view(), name='post_detail'),
    path('post/new/', views.PostCreateView.as_view(), name='post_create'),
    path('post/<slug:slug>/edit/', views.PostUpdateView.as_view(), name='post_update'),
    path('post/<slug:slug>/delete/', views.PostDeleteView.as_view(), name='post_delete'),
    path('category/<int:pk>/', views.CategoryDetailView.as_view(), name='category_detail'),
    path('api/posts/', views.api_posts, name='api_posts'),
]

# URL patterns with parameters
urlpatterns += [
    path('posts/<int:year>/', views.posts_by_year, name='posts_by_year'),
    path('posts/<int:year>/<int:month>/', views.posts_by_month, name='posts_by_month'),
    path('author/<str:username>/', views.posts_by_author, name='posts_by_author'),
]`,
        },
      ],
    },
    {
      id: "templates",
      title: "Templates",
      description: "Django template language and template organization",
      examples: [
        {
          title: "Base Template",
          description: "Creating a base template with blocks for inheritance",
          language: "html",
          code: `<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}My Blog{% endblock %}</title>
    {% load static %}
    <link rel="stylesheet" href="{% static 'css/style.css' %}">
    {% block extra_css %}{% endblock %}
</head>
<body>
    <nav class="navbar">
        <a href="{% url 'blog:post_list' %}">Home</a>
        {% if user.is_authenticated %}
            <a href="{% url 'blog:post_create' %}">New Post</a>
            <a href="{% url 'admin:index' %}">Admin</a>
            <a href="{% url 'logout' %}">Logout ({{ user.username }})</a>
        {% else %}
            <a href="{% url 'login' %}">Login</a>
        {% endif %}
    </nav>

    <main>
        {% if messages %}
            {% for message in messages %}
                <div class="alert alert-{{ message.tags }}">
                    {{ message }}
                </div>
            {% endfor %}
        {% endif %}

        {% block content %}
        {% endblock %}
    </main>

    <footer>
        <p>&copy; 2024 My Blog. All rights reserved.</p>
    </footer>

    {% block extra_js %}{% endblock %}
</body>
</html>`,
        },
        {
          title: "Template with Django Template Language",
          description: "Using Django template tags and filters",
          language: "html",
          code: `<!-- templates/blog/post_list.html -->
{% extends 'base.html' %}
{% load static %}

{% block title %}Blog Posts{% endblock %}

{% block content %}
<div class="container">
    <h1>Latest Posts</h1>

    {% if posts %}
        {% for post in posts %}
            <article class="post-card">
                <h2>
                    <a href="{% url 'blog:post_detail' slug=post.slug %}">
                        {{ post.title }}
                    </a>
                </h2>

                <div class="post-meta">
                    <span>By {{ post.author.username }}</span>
                    <span>{{ post.created_at|date:"F d, Y" }}</span>
                    {% if post.category %}
                        <span>in <a href="{% url 'blog:category_detail' pk=post.category.pk %}">
                            {{ post.category.name }}
                        </a></span>
                    {% endif %}
                </div>

                <div class="post-excerpt">
                    {{ post.content|truncatewords:30|safe }}
                </div>

                <a href="{% url 'blog:post_detail' slug=post.slug %}" class="read-more">
                    Read More
                </a>
            </article>
        {% endfor %}

        <!-- Pagination -->
        {% if is_paginated %}
            <div class="pagination">
                <span class="page-links">
                    {% if page_obj.has_previous %}
                        <a href="?page=1">&laquo; first</a>
                        <a href="?page={{ page_obj.previous_page_number }}">previous</a>
                    {% endif %}

                    <span class="current">
                        Page {{ page_obj.number }} of {{ page_obj.paginator.num_pages }}
                    </span>

                    {% if page_obj.has_next %}
                        <a href="?page={{ page_obj.next_page_number }}">next</a>
                        <a href="?page={{ page_obj.paginator.num_pages }}">last &raquo;</a>
                    {% endif %}
                </span>
            </div>
        {% endif %}
    {% else %}
        <p>No posts yet.</p>
    {% endif %}
</div>
{% endblock %}`,
        },
      ],
    },
    {
      id: "forms",
      title: "Forms",
      description: "Django forms for user input and validation",
      examples: [
        {
          title: "Model Forms",
          description: "Creating forms from Django models",
          language: "python",
          code: `# forms.py
from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import Post, Category, UserProfile

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'category', 'status']
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': 'Enter post title'
            }),
            'content': forms.Textarea(attrs={
                'class': 'form-control',
                'rows': 10,
                'placeholder': 'Write your post content here...'
            }),
            'category': forms.Select(attrs={'class': 'form-control'}),
            'status': forms.Select(attrs={'class': 'form-control'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields['category'].queryset = Category.objects.all()
        self.fields['category'].empty_label = "Select a category"

    def clean_title(self):
        title = self.cleaned_data['title']
        if len(title) < 5:
            raise forms.ValidationError("Title must be at least 5 characters long.")
        return title

class UserRegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(max_length=30, required=True)
    last_name = forms.CharField(max_length=30, required=True)

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')

    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        if commit:
            user.save()
        return user

class UserProfileForm(forms.ModelForm):
    birth_date = forms.DateField(
        widget=forms.DateInput(attrs={'type': 'date'}),
        required=False
    )

    class Meta:
        model = UserProfile
        fields = ['bio', 'location', 'birth_date', 'avatar']
        widgets = {
            'bio': forms.Textarea(attrs={'rows': 4}),
        }`,
        },
        {
          title: "Custom Forms and Validation",
          description: "Creating custom forms with validation",
          language: "python",
          code: `# forms.py
from django import forms
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User

class ContactForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Your Name'
        })
    )
    email = forms.EmailField(
        widget=forms.EmailInput(attrs={
            'class': 'form-control',
            'placeholder': 'Your Email'
        })
    )
    subject = forms.CharField(
        max_length=200,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Subject'
        })
    )
    message = forms.CharField(
        widget=forms.Textarea(attrs={
            'class': 'form-control',
            'rows': 5,
            'placeholder': 'Your Message'
        })
    )

    def clean_email(self):
        email = self.cleaned_data['email']
        if not email.endswith('@example.com'):
            raise ValidationError("Email must be from example.com domain")
        return email

    def clean(self):
        cleaned_data = super().clean()
        name = cleaned_data.get('name')
        message = cleaned_data.get('message')

        if name and message:
            if name.lower() in message.lower():
                raise ValidationError("Message cannot contain your name")

        return cleaned_data

class SearchForm(forms.Form):
    query = forms.CharField(
        max_length=255,
        widget=forms.TextInput(attrs={
            'class': 'form-control',
            'placeholder': 'Search posts...',
            'autofocus': True
        })
    )
    category = forms.ModelChoiceField(
        queryset=Category.objects.all(),
        required=False,
        empty_label="All Categories",
        widget=forms.Select(attrs={'class': 'form-control'})
    )
    date_from = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control'})
    )
    date_to = forms.DateField(
        required=False,
        widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control'})
    )`,
        },
      ],
    },
    {
      id: "admin",
      title: "Django Admin",
      description: "Customizing the Django admin interface",
      examples: [
        {
          title: "Basic Admin Configuration",
          description: "Registering models and basic admin customization",
          language: "python",
          code: `# admin.py
from django.contrib import admin
from django.utils.html import format_html
from .models import Post, Category, Tag, UserProfile

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'post_count', 'created_at']
    search_fields = ['name', 'description']
    list_filter = ['created_at']
    prepopulated_fields = {'slug': ('name',)}  # If you have a slug field

    def post_count(self, obj):
        return obj.post_set.count()
    post_count.short_description = 'Number of Posts'

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author', 'category', 'status', 'created_at', 'post_actions']
    list_filter = ['status', 'category', 'created_at', 'author']
    search_fields = ['title', 'content']
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'created_at'
    list_editable = ['status']
    list_per_page = 20

    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'author', 'category')
        }),
        ('Content', {
            'fields': ('content',)
        }),
        ('Publishing', {
            'fields': ('status', 'published_at'),
            'classes': ('collapse',)
        }),
    )

    def post_actions(self, obj):
        return format_html(
            '<a class="button" href="/blog/post/{}/edit/">Edit</a>&nbsp;'
            '<a class="button" href="/blog/post/{}/">View</a>',
            obj.slug, obj.slug
        )
    post_actions.short_description = 'Actions'
    post_actions.allow_tags = True

# Inline admin
class PostInline(admin.TabularInline):
    model = Post
    extra = 0
    fields = ['title', 'status', 'created_at']
    readonly_fields = ['created_at']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'location', 'birth_date']
    list_filter = ['location']
    search_fields = ['user__username', 'user__email']
    inlines = [PostInline]

# Customizing admin site
admin.site.site_header = "My Blog Administration"
admin.site.site_title = "My Blog Admin Portal"
admin.site.index_title = "Welcome to My Blog Administration Portal"`,
        },
      ],
    },
    {
      id: "authentication",
      title: "Authentication",
      description: "User authentication and authorization",
      examples: [
        {
          title: "Login and Registration Views",
          description: "Custom authentication views",
          language: "python",
          code: `# views.py
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.contrib.auth.models import User
from .forms import UserRegistrationForm, UserProfileForm

def register_view(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            username = form.cleaned_data.get('username')
            messages.success(request, f'Account created for {username}!')

            # Log the user in after registration
            user = authenticate(username=username, password=form.cleaned_data['password1'])
            if user:
                login(request, user)
                return redirect('blog:post_list')
    else:
        form = UserRegistrationForm()

    return render(request, 'registration/register.html', {'form': form})

def custom_login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            next_page = request.GET.get('next', 'blog:post_list')
            return redirect(next_page)
        else:
            messages.error(request, 'Invalid username or password.')

    return render(request, 'registration/login.html')

@login_required
def profile_view(request):
    try:
        profile = request.user.userprofile
    except UserProfile.DoesNotExist:
        profile = UserProfile.objects.create(user=request.user)

    if request.method == 'POST':
        form = UserProfileForm(request.POST, request.FILES, instance=profile)
        if form.is_valid():
            form.save()
            messages.success(request, 'Profile updated successfully!')
            return redirect('profile')
    else:
        form = UserProfileForm(instance=profile)

    return render(request, 'registration/profile.html', {'form': form})

@login_required
def change_password_view(request):
    if request.method == 'POST':
        old_password = request.POST['old_password']
        new_password = request.POST['new_password']
        confirm_password = request.POST['confirm_password']

        if not request.user.check_password(old_password):
            messages.error(request, 'Old password is incorrect.')
        elif new_password != confirm_password:
            messages.error(request, 'New passwords do not match.')
        else:
            request.user.set_password(new_password)
            request.user.save()
            messages.success(request, 'Password changed successfully!')
            return redirect('login')

    return render(request, 'registration/change_password.html')`,
        },
      ],
    },
  ],
};
