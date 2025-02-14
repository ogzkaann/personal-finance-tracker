export default {
  app: {
    title: {
      main: 'FinTrack',
      sub: 'Financial Tracking System'
    },
    navigation: {
      transactions: 'Transactions',
      analytics: 'Analytics',
      dashboard: 'Dashboard',
      categories: 'Categories'
    },
    userMenu: {
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Sign Out'
    }
  },
  auth: {
    login: {
      title: 'Sign in to your account',
      subtitle: 'Start tracking your financial goals',
      submit: 'Sign In',
      loading: 'Signing in...',
      noAccount: "Don't have an account?",
      register: 'Create a new account',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password'
    },
    register: {
      title: 'Create a new account',
      subtitle: 'Start your financial journey',
      submit: 'Create Account',
      loading: 'Creating account...',
      haveAccount: 'Already have an account?',
      login: 'Sign in',
      terms: 'I accept the terms of service',
      privacy: 'I accept the privacy policy'
    },
    logout: 'Sign Out',
    fields: {
      email: 'Email Address',
      password: 'Password',
      name: 'Full Name',
      confirmPassword: 'Confirm Password'
    },
    placeholders: {
      email: 'example@email.com',
      password: '••••••••',
      name: 'Full Name',
      confirmPassword: '••••••••'
    },
    errors: {
      invalidCredentials: 'Invalid email or password',
      emailExists: 'This email is already in use',
      required: 'This field is required',
      passwordMismatch: 'Passwords do not match',
      invalidEmail: 'Invalid email address',
      weakPassword: 'Password is too weak'
    },
    success: {
      login: 'Successfully signed in',
      register: 'Account created successfully',
      logout: 'Successfully signed out'
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
      manage: 'Manage',
      confirm: 'Confirm',
      reject: 'Reject',
      search: 'Search',
      filter: 'Filter',
      clear: 'Clear',
      refresh: 'Refresh',
      view: 'View',
      download: 'Download',
      upload: 'Upload',
      print: 'Print'
    },
    status: {
      loading: 'Loading...',
      error: 'An error occurred',
      success: 'Operation successful',
      empty: 'No data found',
      pending: 'Pending',
      processing: 'Processing',
      completed: 'Completed',
      failed: 'Failed'
    },
    buttons: {
      save: 'Save',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      confirm: 'Confirm',
      back: 'Back',
      next: 'Next'
    },
    messages: {
      confirmDelete: 'Are you sure you want to delete this item?',
      confirmAction: 'Are you sure you want to perform this action?',
      unsavedChanges: 'You have unsaved changes'
    },
    labels: {
      yes: 'Yes',
      no: 'No',
      or: 'or',
      all: 'All',
      none: 'None',
      select: 'Select',
      search: 'Search...',
      filter: 'Filter...',
      noResults: 'No results found',
      loading: 'Loading...'
    }
  },
  transactions: {
    title: 'Transactions',
    addExpense: 'Add Expense',
    addIncome: 'Add Income',
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
      date: 'Date',
      createdAt: 'Created At',
      updatedAt: 'Updated At',
      selectCategory: 'Select Category'
    },
    summary: {
      totalIncome: 'Total Income',
      totalExpense: 'Total Expense',
      balance: 'Balance',
      savingsRate: 'Savings Rate',
      monthlyIncome: 'Monthly Income',
      monthlyExpense: 'Monthly Expense',
      monthlyBalance: 'Monthly Balance'
    },
    filters: {
      all: 'All',
      dateRange: 'Date Range',
      category: 'Category',
      type: 'Type',
      amount: 'Amount',
      description: 'Description'
    },
    messages: {
      deleteConfirm: 'Are you sure you want to delete this transaction?',
      addSuccess: 'Transaction added successfully',
      editSuccess: 'Transaction updated successfully',
      deleteSuccess: 'Transaction deleted successfully',
      noTransactions: 'No transactions found.',
      invalidAmount: 'Invalid amount',
      requiredFields: 'Please fill in all required fields'
    },
    form: {
      addIncome: 'Add New Income',
      addExpense: 'Add New Expense',
      editIncome: 'Edit Income',
      editExpense: 'Edit Expense',
      selectCategory: 'Select Category',
      title: {
        income: 'Add New Income',
        expense: 'Add New Expense'
      },
      amount: 'Amount',
      category: 'Category',
      description: 'Description',
      date: 'Date',
      buttons: {
        income: 'Income',
        expense: 'Expense',
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete'
      },
      placeholders: {
        amount: 'Enter amount',
        description: 'Enter description',
        category: 'Select category'
      }
    },
    recurrence: {
      title: 'Recurrence',
      options: {
        enabled: 'Recurring Transaction',
      },
      types: {
        none: 'One Time',
        daily: 'Daily',
        weekly: 'Weekly',
        monthly: 'Monthly',
        yearly: 'Yearly'
      },
      endDate: 'End Date',
      startDate: 'Start Date',
      noEndDate: 'No end date',
      messages: {
        created: 'Recurring transaction created successfully',
        updated: 'Recurring transaction updated successfully',
        deleted: 'Recurring transaction deleted successfully'
      }
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
      deleteSuccess: 'Category deleted successfully',
      noCategories: 'No categories found.',
      inUse: 'This category cannot be deleted because it is in use'
    },
    dialog: {
      newIncome: 'New Income Category',
      newExpense: 'New Expense Category',
      editIncome: 'Edit Income Category',
      editExpense: 'Edit Expense Category',
      name: 'Category Name',
      type: 'Category Type',
      icon: 'Select Icon',
      color: 'Select Color',
      buttons: {
        save: 'Save',
        cancel: 'Cancel',
        delete: 'Delete'
      },
      types: {
        income: 'Income',
        expense: 'Expense'
      }
    }
  },
  analytics: {
    title: 'Analytics',
    charts: {
      monthlyTrend: 'Monthly Trend',
      categoryDistribution: 'Category Distribution',
      incomeExpense: 'Income/Expense Analysis',
      savingsRate: 'Savings Rate Trend',
      categoryComparison: 'Category Comparison',
      yearlyComparison: 'Yearly Comparison'
    },
    metrics: {
      netBalance: 'Net Balance',
      savingsRate: 'Savings Rate',
      thisMonth: "This month's {type}",
      currentBalance: 'Your current balance',
      incomeExpenseRatio: 'Your income/expense ratio',
      total: 'Total',
      monthlyIncome: 'Monthly Income',
      monthlyExpense: 'Monthly Expense',
      monthlyBalance: 'Monthly Balance',
      yearlyIncome: 'Yearly Income',
      yearlyExpense: 'Yearly Expense',
      yearlyBalance: 'Yearly Balance',
      averageIncome: 'Average Income',
      averageExpense: 'Average Expense',
      topCategories: 'Top Categories',
      growth: 'Growth Rate'
    },
    filters: {
      dateRange: 'Date Range',
      category: 'Category',
      type: 'Type',
      comparison: 'Comparison',
      groupBy: 'Group By'
    },
    timeRanges: {
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      lastWeek: 'Last Week',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      thisYear: 'This Year',
      lastYear: 'Last Year',
      custom: 'Custom'
    }
  },
  dateRangePicker: {
    start: 'Start',
    end: 'End',
    presets: {
      today: 'Today',
      yesterday: 'Yesterday',
      thisWeek: 'This Week',
      lastWeek: 'Last Week',
      thisMonth: 'This Month',
      lastMonth: 'Last Month',
      thisYear: 'This Year',
      lastYear: 'Last Year'
    },
    custom: 'Custom Range',
    clear: 'Clear',
    apply: 'Apply',
    months: {
      january: 'January',
      february: 'February',
      march: 'March',
      april: 'April',
      may: 'May',
      june: 'June',
      july: 'July',
      august: 'August',
      september: 'September',
      october: 'October',
      november: 'November',
      december: 'December'
    },
    monthsShort: {
      jan: 'Jan',
      feb: 'Feb',
      mar: 'Mar',
      apr: 'Apr',
      may: 'May',
      jun: 'Jun',
      jul: 'Jul',
      aug: 'Aug',
      sep: 'Sep',
      oct: 'Oct',
      nov: 'Nov',
      dec: 'Dec'
    },
    weekdays: {
      sunday: 'Sunday',
      monday: 'Monday',
      tuesday: 'Tuesday',
      wednesday: 'Wednesday',
      thursday: 'Thursday',
      friday: 'Friday',
      saturday: 'Saturday'
    },
    weekdaysShort: {
      sun: 'Sun',
      mon: 'Mon',
      tue: 'Tue',
      wed: 'Wed',
      thu: 'Thu',
      fri: 'Fri',
      sat: 'Sat'
    },
    weekdaysMin: {
      su: 'Su',
      mo: 'Mo',
      tu: 'Tu',
      we: 'We',
      th: 'Th',
      fr: 'Fr',
      sa: 'Sa'
    }
  },
  categoryModal: {
    title: 'Manage Categories',
    addCategory: 'Add Category',
    editCategory: 'Edit Category',
    categoryName: 'Category Name',
    icon: 'Icon',
    color: 'Color',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    type: 'Type',
    errorEmptyName: 'Category name cannot be empty',
    errorDuplicate: 'This category already exists',
    confirmDelete: 'Are you sure you want to delete this category?',
    successAdd: 'Category added successfully',
    successEdit: 'Category updated successfully',
    successDelete: 'Category deleted successfully',
    newIncomeCategory: 'New Income Category',
    newExpenseCategory: 'New Expense Category',
    editIncomeCategory: 'Edit Income Category',
    editExpenseCategory: 'Edit Expense Category',
    placeholders: {
      name: 'Enter category name'
    },
    buttons: {
      cancel: 'Cancel',
      save: 'Save'
    },
    fields: {
      name: 'Category Name',
      icon: 'Icon',
      color: 'Color'
    }
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome',
    summary: {
      totalBalance: 'Total Balance',
      monthlyIncome: 'Monthly Income',
      monthlyExpense: 'Monthly Expense',
      savingsRate: 'Savings Rate'
    },
    widgets: {
      recentTransactions: 'Recent Transactions',
      categoryDistribution: 'Category Distribution',
      monthlyTrend: 'Monthly Trend',
      topCategories: 'Top Categories'
    },
    actions: {
      addTransaction: 'Add Transaction',
      viewAll: 'View All',
      manage: 'Manage'
    }
  }
} 