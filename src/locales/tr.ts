export default {
  app: {
    title: 'Kişisel Finans Takibi',
    navigation: {
      transactions: 'İşlemler',
      analytics: 'Analitik'
    }
  },
  auth: {
    login: {
      title: 'Hesabınıza Giriş Yapın',
      subtitle: 'Finansal hedeflerinizi takip etmeye başlayın',
      submit: 'Giriş Yap',
      loading: 'Giriş yapılıyor...',
      noAccount: 'Hesabınız yok mu?',
      register: 'Yeni hesap oluşturun'
    },
    register: {
      title: 'Yeni Hesap Oluşturun',
      subtitle: 'Finansal yolculuğunuza başlayın',
      submit: 'Hesap Oluştur',
      loading: 'Hesap oluşturuluyor...',
      haveAccount: 'Zaten hesabınız var mı?',
      login: 'Giriş yapın'
    },
    logout: 'Çıkış Yap',
    fields: {
      email: 'E-posta Adresi',
      password: 'Şifre',
      name: 'Ad Soyad'
    },
    placeholders: {
      email: 'ornek@email.com',
      password: '••••••••',
      name: 'John Doe'
    },
    errors: {
      invalidCredentials: 'Geçersiz e-posta veya şifre',
      emailExists: 'Bu e-posta adresi zaten kullanılıyor',
      required: 'Bu alan zorunludur'
    }
  },
  common: {
    actions: {
      add: 'Ekle',
      edit: 'Düzenle',
      delete: 'Sil',
      save: 'Kaydet',
      cancel: 'İptal',
      close: 'Kapat',
      manage: 'Yönet'
    },
    status: {
      loading: 'Yükleniyor...',
      error: 'Hata oluştu',
      success: 'İşlem başarılı',
      empty: 'Veri bulunamadı'
    }
  },
  transactions: {
    title: 'İşlemler',
    new: 'Yeni İşlem',
    type: {
      income: 'Gelir',
      expense: 'Gider'
    },
    fields: {
      type: 'İşlem Tipi',
      amount: 'Miktar',
      category: 'Kategori',
      description: 'Açıklama',
      date: 'Tarih'
    },
    summary: {
      totalIncome: 'Toplam Gelir',
      totalExpense: 'Toplam Gider',
      balance: 'Bakiye',
      savingsRate: 'Tasarruf Oranı'
    },
    filters: {
      all: 'Tümü',
      dateRange: 'Tarih Aralığı',
      category: 'Kategori',
      type: 'Tip'
    },
    messages: {
      deleteConfirm: 'Bu işlemi silmek istediğinizden emin misiniz?',
      addSuccess: 'İşlem başarıyla eklendi',
      editSuccess: 'İşlem başarıyla güncellendi',
      deleteSuccess: 'İşlem başarıyla silindi'
    }
  },
  categories: {
    title: 'Kategoriler',
    new: 'Yeni Kategori',
    manage: 'Kategorileri Yönet',
    incomeCategories: 'Gelir Kategorileri',
    expenseCategories: 'Gider Kategorileri',
    addNew: 'Yeni Ekle',
    fields: {
      name: 'Kategori Adı',
      type: 'Kategori Tipi',
      icon: 'İkon',
      color: 'Renk'
    },
    messages: {
      emptyName: 'Kategori adı boş olamaz',
      duplicate: 'Bu kategori zaten mevcut',
      deleteConfirm: 'Bu kategoriyi silmek istediğinizden emin misiniz?',
      addSuccess: 'Kategori başarıyla eklendi',
      editSuccess: 'Kategori başarıyla güncellendi',
      deleteSuccess: 'Kategori başarıyla silindi'
    }
  },
  analytics: {
    title: 'Analitik',
    charts: {
      monthlyTrend: 'Aylık Trend',
      categoryDistribution: 'Kategori Dağılımı',
      incomeExpense: 'Gelir/Gider Analizi'
    },
    metrics: {
      netBalance: 'Net Bakiye',
      savingsRate: 'Tasarruf Oranı',
      thisMonth: 'Bu ayki {type}',
      currentBalance: 'Mevcut bakiyeniz',
      incomeExpenseRatio: 'Gelir/gider oranınız',
      total: 'Toplam'
    }
  },
  dateRangePicker: {
    start: 'Başlangıç',
    end: 'Bitiş'
  },
  categoryModal: {
    title: 'Kategorileri Yönet',
    addCategory: 'Kategori Ekle',
    editCategory: 'Kategori Düzenle',
    categoryName: 'Kategori Adı',
    icon: 'İkon',
    color: 'Renk',
    cancel: 'İptal',
    errorEmptyName: 'Kategori adı boş olamaz',
    errorDuplicate: 'Bu kategori zaten mevcut',
    confirmDelete: 'Bu kategoriyi silmek istediğinizden emin misiniz?'
  }
} 