# Kurs Satış ve Yönetim Uygulaması

Bu proje, kullanıcıların geliştirmek istedikleri konularda kurs satın alabileceği, eğitmenlerin ise kurs ekleyip yönettiği bir web tabanlı uygulamadır. Backend kısmı **.NET Core 8 Web API**, frontend kısmı ise **React** kullanılarak geliştirilmiştir.

## Proje Mimarisi

Proje 5 katmandan oluşmaktadır:

### 1. **Business Layer**
- İş mantıklarının ve kurallarının yazıldığı katmandır.
- Kurs satın alma, ekleme ve raporlama işlemleri burada yönetilir.

### 2. **Data Access Layer**
- Veritabanı işlemlerinin gerçekleştirildiği katmandır.
- **Repository Pattern** ve **Unit of Work Pattern** kullanılarak veritabanı işlemleri optimize edilmiştir.

### 3. **Core Layer**
- Tüm projede kullanılabilecek genel servisler, altyapı ve yardımcı araçlar bu katmanda bulunur.

### 4. **Entity Layer**
- Veritabanı tablolarına karşılık gelen modellerin bulunduğu katmandır.
- Örnek: `Course`, `User`, `Order` sınıfları.

### 5. **API Layer**
- Kullanıcılara ve frontend uygulamasına açık API uçlarının tanımlandığı katmandır.
- Örnek: Kurs ekleme, satın alma ve kullanıcı detaylarını dönen uçlar.

## Özellikler

### Kullanıcılar
- Kurslara göz atabilir ve satın alabilir.
- Satın aldığı kursları görüntüleyebilir.

### Eğitmenler
- Yeni kurslar ekleyebilir.
- Kurslarına kayıtlı öğrencileri görüntüleyebilir.

## Teknik Detaylar

### Backend
- **Dil**: C#
- **Framework**: .NET Core 8 Web API
- **Mimari**: Repository Pattern, Unit of Work Pattern
- **Veritabanı**: MSSQL
- **Yetkilendirme**: JWT tabanlı kimlik doğrulama

### Frontend
- **Dil**: JavaScript
- **Kütüphane**: React

### Kullanılan Teknolojiler
- **Entity Framework Core**: Veritabanı işlemleri için.
- **Identity**: Kullanıcı kimlik doğrulama ve rol yönetimi.
- **Axios**: Frontend ile Backend arasındaki API iletişimi için.
- **JWT Token** Kullanıcı kimlik doğrulması için kullaıldı.

## Kurulum

### Backend
1. **Veritabanını migrate edin:**
   Uygula için hazır kullanbileceğiniz kullanıcı rol ve kullanıcı bilgilerini hazır olarak alabilirsiniz
2. **Uygulamayı başlatın:**
   Back-end'i direkt olarak projeyi derleyerek ayağa kaldırabilirsiniz.
 
### Frontend
1. **Uygulamayı başlatın:**
 Front-end için ise Ide'nin Command Prompt (CMD) açılarak öncelikle cd InveonBootcamp.MiniCourseApp\PresentationLayer\client\course içine girilir ardından npm start komutu ile ayağa kaldırabilirsiniz.


## Proje görselleri ve API Uçları

1. **Giriş Ekranı**
   
   ![image](https://github.com/user-attachments/assets/83a549fe-0367-4417-ba37-b221cc62af24)

   API ucu: **(Post) https://localhost:7037/api/Auth/Login**

2. **Kullanıcı Kayıt Ekranı**

   ![image](https://github.com/user-attachments/assets/c7182226-fdae-48f7-b70c-6f2267e6f77f)

   API ucu: **(Post) https://localhost:7037/api/User**

3. **Normal Kullanıcı Ana Sayfa**

   Kullanıcı bu ekranda kursları görüntüler. Aynı zamanda kurs arama, kursları sepete ekleyebilir sepet ikonuna tıklayarak görüntüleyebilir ve satın alabiilir. Ayrıca satın aldığı kursları görüntüleme için **Kurslarım** saygfasına yönlendirebilir ve Profil iconuna tılayarak öçıkış işlemini gerçekleyebilir.

   ![image](https://github.com/user-attachments/assets/38eb1582-3444-4ed3-8950-b6b8014d63e4)

   ![image](https://github.com/user-attachments/assets/82726398-63b9-411d-83fb-2b7e886c6495)

   API ucu (kurs verilerini getirmek için): **(Get) https://localhost:7037/Api/Course**
   
5. **Normal kullanıcı Kurslarım sayfası**
   
   Kişi satın aldığı kursları görüntüleyebilir.
   
   ![image](https://github.com/user-attachments/assets/01cc4a50-bb17-4e12-aabe-048f0d83c768)

   API Ucu: **(Get) https://localhost:7037/api/UserCourse?email=email**

6. **Eğitmen Ana sayfa**

   Tıpkı normal kullanıcı gibi ana sayfası diğer kullanıcıların kuırslarını görüntüler ve diğer benze işleri yapar fark olarak **Kurs Ekle** ve **Kurs ve Öğrenci Yönet** linklerini nav-bar içinde görüntülenir.

   ![image](https://github.com/user-attachments/assets/946c8fb8-0e3a-4c6a-b717-bb04c2f18016)

7. **Eğitmen Kurs Ekle Sayfası**

   Eğitmen kurs bilgilerini ekler.

   ![image](https://github.com/user-attachments/assets/580fa5f8-7688-47b0-8b11-1f4ad9fc6777)

   API Ucu (Kategori verilerini getirmek için): **(Get) https://localhost:7037/api/Catagory**
   API Ucu (Eğitmen verisini getirmek için): **(Get) https://localhost:7037/api/User?mail=email**
   API Ucu (Kurs verilerini eklemek için): **(Post) https://localhost:7037/api/Course**

8. **Eğitmen Kurs ve Öğrenci Yönet Sayfası**

   Bu sayfada eğitmen kendi eklediği kursları satın alan kişileri görüntüler ve kursu silebilir.

   ![image](https://github.com/user-attachments/assets/099d11c7-863f-4d72-ac05-3e05d3036858)

   API Ucu: **(Get) https://localhost:7037/api/Course/CourseAnalytics?email={instructorEmail**
   API Ucu(Kursu silmek için): **(Delete) https://localhost:7037/api/Course?id=courseId**

9. **Diğer API Uçları**

    API Ucu(Çıkış işlemi için): **(Post) https://localhost:7037/api/Auth/RevokeRefreshToken**
   
    API Ucu(Rol eklemek için): **(Post) https://localhost:7037/api/UserRole/CreateRole?roleName=Instructor**
   
    API Ucu(Kullanıcıya Rol atamak için): **(Post) https://localhost:7037/api/UserRole?email=beyza@gmail.com&roleName=Instructor**


