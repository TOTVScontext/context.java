import Header from './components/Header.jsx';
import NewsAdminPage from './pages/NewsAdminPage.jsx';
import ChangeIcon from './hooks/ChangeIcon'

export default function App() {

  ChangeIcon();

  return (
    <>
      <Header />
      <NewsAdminPage />
    </>
  );
}
