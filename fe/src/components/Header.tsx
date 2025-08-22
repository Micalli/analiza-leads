import { useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 bg-header text-white shadow-lg z-50">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Título e navegação em linha para telas maiores */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-4">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-0">
            Classificador de Leads
          </h1>
          
          {/* Navegação responsiva */}
          <nav className="flex space-x-1">
            <button
              onClick={() => navigate('/upload')}
              className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/upload')
                  ? 'bg-primary text-black'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Upload
            </button>
            <button
              onClick={() => navigate('/historico')}
              className={`cursor-pointer px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive('/historico')
                  ? 'bg-primary text-black'
                  : 'text-gray-300 hover:text-white hover:bg-gray-700'
              }`}
            >
              Histórico
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
