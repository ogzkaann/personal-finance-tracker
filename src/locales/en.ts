export default {
  app: {
    title: 'Personal Finance Tracker',
    navigation: {
      transactions: 'Transactions',
      analytics: 'Analytics'
    }
  },
  auth: {
    login: {
      title: 'Sign in to your account',
      subtitle: 'Start tracking your financial goals',
      submit: 'Sign In',
      loading: 'Signing in...',
      noAccount: "Don't have an account?",
      register: 'Create a new account'
    },
    register: {
      title: 'Create a new account',
      subtitle: 'Start your financial journey',
      submit: 'Create Account',
      loading: 'Creating account...',
      haveAccount: 'Already have an account?',
      login: 'Sign in'
    },
    logout: 'Sign Out',
    fields: {
      email: 'Email Address',
      password: 'Password',
      name: 'Full Name'
    },
    placeholders: {
      email: 'example@email.com',
      password: '••••••••',
      name: 'John Doe'
    },
    errors: {
      invalidCredentials: 'Invalid email or password',
      emailExists: 'This email is already in use',
      required: 'This field is required'
    }
  },
  common: {
    actions: {
      add: 'Add',
      edit: 'Edit',
      delete: 'Delete',
      save: 'Save',
      cancel: 'Cancel',
      close: 'Close',
      manage: 'Manage'
    },
    status: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Operation successful',
      empty: 'No data found'
    }
  },
  transactions: {
    title: 'Transactions',
    new: 'New Transaction',
    type: {
      income: 'Income',
      expense: 'Expense'
    },
    fields: {
      type: 'Transaction Type',
      amount: 'Amount',
      category: 'Category',
      description: 'Description',
      date: 'Date'
    },
    summary: {
      totalIncome: 'Total Income',
      totalExpense: 'Total Expense',
      balance: 'Balance',
      savingsRate: 'Savings Rate'
    },
    filters: {
      all: 'All',
      dateRange: 'Date Range',
      category: 'Category',
      type: 'Type'
    },
    messages: {
      deleteConfirm: 'Are you sure you want to delete this transaction?',
      addSuccess: 'Transaction added successfully',
      editSuccess: 'Transaction updated successfully',
      deleteSuccess: 'Transaction deleted successfully'
    }
  },
  categories: {
    title: 'Categories',
    new: 'New Category',
    manage: 'Manage Categories',
    incomeCategories: 'Income Categories',
    expenseCategories: 'Expense Categories',
    addNew: 'Add New',
    fields: {
      name: 'Category Name',
      type: 'Category Type',
      icon: 'Icon',
      color: 'Color'
    },
    messages: {
      emptyName: 'Category name cannot be empty',
      duplicate: 'This category already exists',
      deleteConfirm: 'Are you sure you want to delete this category?',
      addSuccess: 'Category added successfully',
      editSuccess: 'Category updated successfully',
      deleteSuccess: 'Category deleted successfully'
    }
  },
  analytics: {
    title: 'Analytics',
    charts: {
      monthlyTrend: 'Monthly Trend',
      categoryDistribution: 'Category Distribution',
      incomeExpense: 'Income/Expense Analysis'
    },
    metrics: {
      netBalance: 'Net Balance',
      savingsRate: 'Savings Rate',
      thisMonth: 'This month\'s {type}',
      currentBalance: 'Your current balance',
      incomeExpenseRatio: 'Your income/expense ratio',
      total: 'Total'
    }
  },
  dateRangePicker: {
    start: 'Start',
    end: 'End'
  },
  categoryModal: {
    title: 'Manage Categories',
    addCategory: 'Add Category',
    editCategory: 'Edit Category',
    categoryName: 'Category Name',
    icon: 'Icon',
    color: 'Color',
    cancel: 'Cancel',
    errorEmptyName: 'Category name cannot be empty',
    errorDuplicate: 'This category already exists',
    confirmDelete: 'Are you sure you want to delete this category?'
  }
} 