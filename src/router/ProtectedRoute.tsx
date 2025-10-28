import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";

interface Props {
  isAuthenticated?: boolean;
}

const ProtectedRoute: React.FC<Props> = ({ isAuthenticated = false }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
import { lazy, Suspense } from "react"; // 1. lazy ve Suspense'i import ediyoruz

// --- Bileşenler ve Sayfalar ---

// Sizin korumalı rota bileşeniniz. Bunu lazy yüklemiyoruz çünkü bir sayfa değil, bir yapı.

// 2. TÜM SAYFALARI "LAZY" OLARAK IMPORT EDİYORUZ
// Bu, her sayfanın kodunun sadece o sayfaya gidildiğinde yükleneceği anlamına gelir.
const LoginPage = lazy(() => import("../pages/LoginPage/LoginPage"));
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const DashboardPage = lazy(() => import("../pages/DashboardPage/DashboardPage"));


// 3. Yüklenme sırasında kullanıcıya gösterilecek bir bileşen hazırlıyoruz.
// Bu, uygulamanızın daha profesyonel görünmesini sağlar.
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    Yükleniyor...
  </div>
);

// 4. Rota haritasını oluşturuyoruz
export const projectRouter = createBrowserRouter([
  // --- Herkese Açık Rotalar ---
  // Bu rotalar için giriş yapma şartı aranmaz.
  {
    path: "/login",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <HomePage />
      </Suspense>
    ),
  },

  // --- Korumalı Rotalar (Giriş Yapmayı Gerektirenler) ---
  // Bu rotaların hepsi önce sizin ProtectedRoute bileşeninizden geçer.
  {
    element: <ProtectedRoute />, // Ana kontrol noktası bu.
    children: [ // ProtectedRoute içindeki <Outlet /> burada render edilecek sayfaları belirler.
      {
        path: "/dashboard",
        element: (
          <Suspense fallback={<PageLoader />}>
            <DashboardPage />
          </Suspense>
        ),
      },
      // Buraya başka korumalı rotalar ekleyebilirsiniz
      // {
      //   path: "/profile",
      //   element: (
      //     <Suspense fallback={<PageLoader />}>
      //       <ProfilePage />
      //     </Suspense>
      //   ),
      // },
    ],
  },
  
  // --- Eşleşmeyen Rotalar (404) ---
  // Tanımlı yolların hiçbiriyle eşleşmezse bu sayfa gösterilir.
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    ),
  },
]);