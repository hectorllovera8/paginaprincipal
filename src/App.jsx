import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext"; // Importa el AuthProvider
import ProtectedRoute from "./Components/ProtectedRoute";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Inicio from "./Pages/Inicio";
import Nosotros from "./Pages/Nosotros";
import GestiondeSeguridad from "./Pages/GestiondeSeguridad";
import HigieneOcupacional from "./Pages/HigieneOcupacional";
import SaludOcupacional from "./Pages/SaludOcupacional";
import EducacionyFormacion from "./Pages/EducacionyFormacion";
import Contacto from "./Pages/Contacto";
import Login from "./Pages/Login";
import ControldeInventario from "./Pages/ControldeInventario";
import Registrarnuevomedicamento from "./Pages/Registrarnuevomedicamento";
import ListaMaestroMedicamentos from "./Pages/ListaMaestroMedicamentos";
import EntradaMedicamentos from "./Pages/EntradaMedicamentos";
import RegistroUsuarioIntranet from "./Pages/RegistroUsuarioIntranet";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/gestiondeseguridad" element={<GestiondeSeguridad />} />
          <Route path="/higieneocupacional" element={<HigieneOcupacional />} />
          <Route path="/saludocupacional" element={<SaludOcupacional />} />
          <Route path="/educacionyformacion" element={<EducacionyFormacion />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrousuariointranet" element={<RegistroUsuarioIntranet />} />

          {/* Rutas protegidas */}
          <Route path="/controldeinventario" element={<ProtectedRoute element={<ControldeInventario />} />} />
          <Route path="/registrarnuevomedicamento" element={<ProtectedRoute element={<Registrarnuevomedicamento />} />} />
          <Route path="/listamaestromedicamentos" element={<ProtectedRoute element={<ListaMaestroMedicamentos />} />} />
          <Route path="/entradamedicamentos" element={<ProtectedRoute element={<EntradaMedicamentos />} />} />

          <Route path="*" element={<Inicio />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
