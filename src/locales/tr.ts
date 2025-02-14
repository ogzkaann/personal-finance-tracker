export default {
  app: {
    title: {
      main: 'FinTrack',
      sub: 'Finansal Takip Sistemi'
    },
    navigation: {
      transactions: 'İşlemler',
      analytics: 'Analitik',
      dashboard: 'Panel',
      categories: 'Kategoriler'
    },
    userMenu: {
      profile: 'Profil',
      settings: 'Ayarlar',
      logout: 'Çıkış Yap'
    }
  },
  auth: {
    login: {
      title: 'Hesabınıza Giriş Yapın',
      subtitle: 'Finansal hedeflerinizi takip etmeye başlayın',
      submit: 'Giriş Yap',
      loading: 'Giriş yapılıyor...',
      noAccount: 'Hesabınız yok mu?',
      register: 'Yeni hesap oluşturun',
      rememberMe: 'Beni hatırla',
      forgotPassword: 'Şifremi unuttum'
    },
    register: {
      title: 'Yeni Hesap Oluşturun',
      subtitle: 'Finansal yolculuğunuza başlayın',
      submit: 'Hesap Oluştur',
      loading: 'Hesap oluşturuluyor...',
      haveAccount: 'Zaten hesabınız var mı?',
      login: 'Giriş yapın',
      terms: 'Kullanım koşullarını kabul ediyorum',
      privacy: 'Gizlilik politikasını kabul ediyorum'
    },
    logout: 'Çıkış Yap',
    fields: {
      email: 'E-posta Adresi',
      password: 'Şifre',
      name: 'Ad Soyad',
      confirmPassword: 'Şifre Tekrar'
    },
    placeholders: {
      email: 'ornek@email.com',
      password: '••••••••',
      name: 'Ad Soyad',
      confirmPassword: '••••••••'
    },
    errors: {
      invalidCredentials: 'Geçersiz e-posta veya şifre',
      emailExists: 'Bu e-posta adresi zaten kullanılıyor',
      required: 'Bu alan zorunludur',
      passwordMismatch: 'Şifreler eşleşmiyor',
      invalidEmail: 'Geçersiz e-posta adresi',
      weakPassword: 'Şifre çok zayıf'
    },
    success: {
      login: 'Başarıyla giriş yapıldı',
      register: 'Hesabınız başarıyla oluşturuldu',
      logout: 'Başarıyla çıkış yapıldı'
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
      manage: 'Yönet',
      confirm: 'Onayla',
      reject: 'Reddet',
      search: 'Ara',
      filter: 'Filtrele',
      clear: 'Temizle',
      refresh: 'Yenile',
      view: 'Görüntüle',
      download: 'İndir',
      upload: 'Yükle',
      print: 'Yazdır'
    },
    status: {
      loading: 'Yükleniyor...',
      error: 'Hata oluştu',
      success: 'İşlem başarılı',
      empty: 'Veri bulunamadı',
      pending: 'Bekliyor',
      processing: 'İşleniyor',
      completed: 'Tamamlandı',
      failed: 'Başarısız'
    },
    buttons: {
      save: 'Kaydet',
      cancel: 'İptal',
      edit: 'Düzenle',
      delete: 'Sil',
      confirm: 'Onayla',
      back: 'Geri',
      next: 'İleri'
    },
    messages: {
      confirmDelete: 'Bu öğeyi silmek istediğinizden emin misiniz?',
      confirmAction: 'Bu işlemi gerçekleştirmek istediğinizden emin misiniz?',
      unsavedChanges: 'Kaydedilmemiş değişiklikler var'
    },
    labels: {
      yes: 'Evet',
      no: 'Hayır',
      or: 'veya',
      all: 'Tümü',
      none: 'Hiçbiri',
      select: 'Seçin',
      search: 'Ara...',
      filter: 'Filtrele...',
      noResults: 'Sonuç bulunamadı',
      loading: 'Yükleniyor...'
    }
  },
  transactions: {
    title: 'İşlemler',
    addExpense: 'Gider Ekle',
    addIncome: 'Gelir Ekle',
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
      date: 'Tarih',
      createdAt: 'Oluşturulma Tarihi',
      updatedAt: 'Güncellenme Tarihi',
      selectCategory: 'Kategori Seçin'
    },
    summary: {
      totalIncome: 'Toplam Gelir',
      totalExpense: 'Toplam Gider',
      balance: 'Bakiye',
      savingsRate: 'Tasarruf Oranı',
      monthlyIncome: 'Aylık Gelir',
      monthlyExpense: 'Aylık Gider',
      monthlyBalance: 'Aylık Bakiye'
    },
    filters: {
      all: 'Tümü',
      dateRange: 'Tarih Aralığı',
      category: 'Kategori',
      type: 'Tip',
      amount: 'Miktar',
      description: 'Açıklama'
    },
    messages: {
      deleteConfirm: 'Bu işlemi silmek istediğinizden emin misiniz?',
      addSuccess: 'İşlem başarıyla eklendi',
      editSuccess: 'İşlem başarıyla güncellendi',
      deleteSuccess: 'İşlem başarıyla silindi',
      noTransactions: 'Henüz hiç işlem bulunmuyor.',
      invalidAmount: 'Geçersiz miktar',
      requiredFields: 'Lütfen tüm zorunlu alanları doldurun'
    },
    form: {
      addIncome: 'Yeni Gelir Ekle',
      addExpense: 'Yeni Gider Ekle',
      editIncome: 'Gelir Düzenle',
      editExpense: 'Gider Düzenle',
      selectCategory: 'Kategori Seçin',
      title: {
        income: 'Yeni Gelir Ekle',
        expense: 'Yeni Gider Ekle'
      },
      amount: 'Miktar',
      category: 'Kategori',
      description: 'Açıklama',
      date: 'Tarih',
      buttons: {
        income: 'Gelir',
        expense: 'Gider',
        save: 'Kaydet',
        cancel: 'İptal',
        delete: 'Sil'
      },
      placeholders: {
        amount: 'Miktar girin',
        description: 'Açıklama girin',
        category: 'Kategori seçin'
      }
    },
    recurrence: {
      title: 'Tekrar Sıklığı',
      options: {
        enabled: 'Periyodik İşlem',
      },
      types: {
        none: 'Tek Seferlik',
        daily: 'Günlük',
        weekly: 'Haftalık',
        monthly: 'Aylık',
        yearly: 'Yıllık'
      },
      endDate: 'Bitiş Tarihi',
      startDate: 'Başlangıç Tarihi',
      noEndDate: 'Bitiş tarihi yok',
      messages: {
        created: 'Periyodik işlem başarıyla oluşturuldu',
        updated: 'Periyodik işlem başarıyla güncellendi',
        deleted: 'Periyodik işlem başarıyla silindi'
      }
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
      deleteSuccess: 'Kategori başarıyla silindi',
      noCategories: 'Henüz hiç kategori bulunmuyor.',
      inUse: 'Bu kategori kullanımda olduğu için silinemez'
    },
    dialog: {
      newIncome: 'Yeni Gelir Kategorisi',
      newExpense: 'Yeni Gider Kategorisi',
      editIncome: 'Gelir Kategorisini Düzenle',
      editExpense: 'Gider Kategorisini Düzenle',
      name: 'Kategori Adı',
      type: 'Kategori Tipi',
      icon: 'İkon Seçin',
      color: 'Renk Seçin',
      buttons: {
        save: 'Kaydet',
        cancel: 'İptal',
        delete: 'Sil'
      },
      types: {
        income: 'Gelir',
        expense: 'Gider'
      }
    }
  },
  analytics: {
    title: 'Analitik',
    charts: {
      monthlyTrend: 'Aylık Trend',
      categoryDistribution: 'Kategori Dağılımı',
      incomeExpense: 'Gelir/Gider Analizi',
      savingsRate: 'Tasarruf Oranı Trendi',
      categoryComparison: 'Kategori Karşılaştırması',
      yearlyComparison: 'Yıllık Karşılaştırma'
    },
    metrics: {
      netBalance: 'Net Bakiye',
      savingsRate: 'Tasarruf Oranı',
      thisMonth: 'Bu ayki {type}',
      currentBalance: 'Mevcut bakiyeniz',
      incomeExpenseRatio: 'Gelir/gider oranınız',
      total: 'Toplam',
      monthlyIncome: 'Aylık Gelir',
      monthlyExpense: 'Aylık Gider',
      monthlyBalance: 'Aylık Bakiye',
      yearlyIncome: 'Yıllık Gelir',
      yearlyExpense: 'Yıllık Gider',
      yearlyBalance: 'Yıllık Bakiye',
      averageIncome: 'Ortalama Gelir',
      averageExpense: 'Ortalama Gider',
      topCategories: 'En Çok Kullanılan Kategoriler',
      growth: 'Büyüme Oranı'
    },
    filters: {
      dateRange: 'Tarih Aralığı',
      category: 'Kategori',
      type: 'Tip',
      comparison: 'Karşılaştırma',
      groupBy: 'Grupla'
    },
    timeRanges: {
      today: 'Bugün',
      yesterday: 'Dün',
      thisWeek: 'Bu Hafta',
      lastWeek: 'Geçen Hafta',
      thisMonth: 'Bu Ay',
      lastMonth: 'Geçen Ay',
      thisYear: 'Bu Yıl',
      lastYear: 'Geçen Yıl',
      custom: 'Özel'
    }
  },
  dateRangePicker: {
    start: 'Başlangıç',
    end: 'Bitiş',
    presets: {
      today: 'Bugün',
      yesterday: 'Dün',
      thisWeek: 'Bu Hafta',
      lastWeek: 'Geçen Hafta',
      thisMonth: 'Bu Ay',
      lastMonth: 'Geçen Ay',
      thisYear: 'Bu Yıl',
      lastYear: 'Geçen Yıl'
    },
    custom: 'Özel Aralık',
    clear: 'Temizle',
    apply: 'Uygula',
    months: {
      january: 'Ocak',
      february: 'Şubat',
      march: 'Mart',
      april: 'Nisan',
      may: 'Mayıs',
      june: 'Haziran',
      july: 'Temmuz',
      august: 'Ağustos',
      september: 'Eylül',
      october: 'Ekim',
      november: 'Kasım',
      december: 'Aralık'
    },
    monthsShort: {
      jan: 'Oca',
      feb: 'Şub',
      mar: 'Mar',
      apr: 'Nis',
      may: 'May',
      jun: 'Haz',
      jul: 'Tem',
      aug: 'Ağu',
      sep: 'Eyl',
      oct: 'Eki',
      nov: 'Kas',
      dec: 'Ara'
    },
    weekdays: {
      sunday: 'Pazar',
      monday: 'Pazartesi',
      tuesday: 'Salı',
      wednesday: 'Çarşamba',
      thursday: 'Perşembe',
      friday: 'Cuma',
      saturday: 'Cumartesi'
    },
    weekdaysShort: {
      sun: 'Paz',
      mon: 'Pzt',
      tue: 'Sal',
      wed: 'Çar',
      thu: 'Per',
      fri: 'Cum',
      sat: 'Cmt'
    },
    weekdaysMin: {
      su: 'Pz',
      mo: 'Pt',
      tu: 'Sa',
      we: 'Ça',
      th: 'Pe',
      fr: 'Cu',
      sa: 'Ct'
    }
  },
  categoryModal: {
    title: 'Kategorileri Yönet',
    addCategory: 'Kategori Ekle',
    editCategory: 'Kategori Düzenle',
    categoryName: 'Kategori Adı',
    icon: 'İkon',
    color: 'Renk',
    cancel: 'İptal',
    save: 'Kaydet',
    delete: 'Sil',
    type: 'Tip',
    errorEmptyName: 'Kategori adı boş olamaz',
    errorDuplicate: 'Bu kategori zaten mevcut',
    confirmDelete: 'Bu kategoriyi silmek istediğinizden emin misiniz?',
    successAdd: 'Kategori başarıyla eklendi',
    successEdit: 'Kategori başarıyla güncellendi',
    successDelete: 'Kategori başarıyla silindi',
    newIncomeCategory: 'Yeni Gelir Kategorisi',
    newExpenseCategory: 'Yeni Gider Kategorisi',
    editIncomeCategory: 'Gelir Kategorisini Düzenle',
    editExpenseCategory: 'Gider Kategorisini Düzenle',
    placeholders: {
      name: 'Kategori adı girin',
    },
    buttons: {
      cancel: 'İptal',
      save: 'Kaydet',
    },
    fields: {
      name: 'Kategori Adı',
      icon: 'İkon',
      color: 'Renk'
    }
  },
  dashboard: {
    title: 'Panel',
    welcome: 'Hoş Geldiniz',
    summary: {
      totalBalance: 'Toplam Bakiye',
      monthlyIncome: 'Aylık Gelir',
      monthlyExpense: 'Aylık Gider',
      savingsRate: 'Tasarruf Oranı'
    },
    widgets: {
      recentTransactions: 'Son İşlemler',
      categoryDistribution: 'Kategori Dağılımı',
      monthlyTrend: 'Aylık Trend',
      topCategories: 'En Çok Kullanılan Kategoriler'
    },
    actions: {
      addTransaction: 'İşlem Ekle',
      viewAll: 'Tümünü Gör',
      manage: 'Yönet'
    }
  }
} 