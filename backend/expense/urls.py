from django.urls import path
from .views import signUp, login, add_expense, manage_expense, update_expense,delete_expense, report_expense, change_password

urlpatterns = [
    path('signup/',signUp,name='signUp'),
    path('login/',login,name='login'),
    path('add_expense/',add_expense,name='add_expense'),
    path('manage_expense/<int:user_id>/',manage_expense,name='manage_expense'),
    path('update_expense/<int:expense_id>/',update_expense,name='update_expense'),
    path('delete_expense/<int:expense_id>/',delete_expense,name='delete_expense'),
    path('report_expense/<int:user_id>/',report_expense,name='report_expense'),
    path('change_password/<int:user_id>/',change_password,name='change_password'),
]