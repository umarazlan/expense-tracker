from django.shortcuts import render
from django.http import JsonResponse
from django.views .decorators.csrf import csrf_exempt
import json
from .models import UserDetail,Expense
from django.db.models import Sum 
# Create your views here.

#SignUp api
@csrf_exempt
def signUp(request):
    if request.method == 'POST':
       data = json.loads(request.body)
       fullName = data.get('FullName')
       email = data.get('Email')
       password = data.get('Password')
       
       if UserDetail.objects.filter(Email=email).exists():
           return JsonResponse({'message':'Email already exists'},status=400)
       UserDetail.objects.create(FullName=fullName, Email=email, Password=password)
       return JsonResponse({'message':'User registered successfully!'},status=201)
  
#login api 
@csrf_exempt
def login(request):
    if request.method == 'POST':
       data = json.loads(request.body)
       email = data.get('Email')
       password = data.get('Password')
       
       try:
           user = UserDetail.objects.get(Email=email,Password=password)
           return JsonResponse({'message':'Login Successfull Jani','userId':user.id,'FullName':user.FullName},status=200)
       except: 
           return JsonResponse({'message':'Invalid Credentials'},status=400)

#todo add expense      
@csrf_exempt
def add_expense(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            user_id = data.get('userId')
            expense_date = data.get('ExpenseDate')
            expense_item = data.get('ExpenseItem')
            expense_cost = data.get('ExpenseCost')

            # Check user
            try:
                user = UserDetail.objects.get(id=user_id)
            except UserDetail.DoesNotExist:
                return JsonResponse({'message': 'User not found'},status=404)

            # Validate fields
            if not expense_date or not expense_item or not expense_cost:
                return JsonResponse({'message': 'All fields are required'},status=400)

            # Create expense
            expense = Expense.objects.create(
                UserId=user,
                ExpenseDate=expense_date,
                ExpenseItem=expense_item,
                ExpenseCost=expense_cost
            )

            return JsonResponse({'message': 'Expense added successfully!','expenseId': expense.id},status=201)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data'},status=400)

        except Exception as e:
            return JsonResponse({'message': str(e)},status=500)

    return JsonResponse({'message': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def manage_expense(request, user_id):
    if request.method == 'GET':
        
        expenses = Expense.objects.filter(UserId=user_id)
        expense_list = list(expenses.values())
        return JsonResponse(expense_list, safe=False)
    
@csrf_exempt
def update_expense(request, expense_id):
    if request.method == 'PUT':
        data = json.loads(request.body)
        try:
            expense = Expense.objects.get(id=expense_id)
            expense.ExpenseDate = data.get('ExpenseDate',expense.ExpenseDate)
            expense.ExpenseItem = data.get('ExpenseItem',expense.ExpenseItem)
            expense.ExpenseCost = data.get('ExpenseCost',expense.ExpenseCost)
            expense.save()
            return JsonResponse({'message':'Expense updated successfully'},status = 200)
        except:
            return JsonResponse({'message':'Expense not found'},status = 404)
        
@csrf_exempt
def delete_expense(request, expense_id):
    if request.method == 'DELETE':
        try:
            expense = Expense.objects.get(id=expense_id)
            expense.delete()
            return JsonResponse({'message':'Expense deleted successfully'},status = 200)
        except:
            return JsonResponse({'message':'Expense not found'},status = 404)
  

@csrf_exempt
def report_expense(request, user_id):
    if request.method == 'GET':
        try:
            from_date = request.GET.get('from')
            to_date = request.GET.get('to')

            expenses = Expense.objects.filter(
                UserId=user_id,
                ExpenseDate__range=[from_date, to_date]
            )

            expense_list = list(expenses.values())

            agg = expenses.aggregate(
                total=Sum('ExpenseCost')
            )

            total = agg['total'] or 0

            return JsonResponse({
                "expenses": expense_list,
                "total": total
            })

        except Exception as e:
            print("REPORT ERROR:", e)
            return JsonResponse({
                "message": str(e)
            }, status=500)

    return JsonResponse(
        {'message': 'Only GET method is allowed'},
        status=405
    )
    
@csrf_exempt
def change_password(request,user_id):
    if request.method == 'POST':
            data = json.loads(request.body)
            old_password = data.get('oldPassword')
            new_password = data.get('newPassword')

            # Check user
            try:
                user = UserDetail.objects.get(id=user_id)
                if user.Password != old_password:
                    return JsonResponse({'message': 'Invalid Password'},status=400)
                user.Password = new_password
                user.save()
                return JsonResponse({'message': 'Password Changed Successfully!'},status=200)
            except:
                return JsonResponse({'message': 'User not found'},status=404)
