import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Link,
} from "react-router-dom";
import { CandlestickChart } from "./features/chart/components/CandlestickChart";

const Layout = () => (
  <div className='min-h-screen bg-slate-950 text-slate-100'>
    <nav className='border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex gap-6'>
      <Link to='/'>WTS</Link>
      <Link to='/'>마켓탐색</Link>
      <Link to='/trade/BTC'>거래 대시보드</Link>
      <Link to='/history'>투자 내역</Link>
    </nav>

    <main className='p-6 md:p-8'>
      <Outlet />
    </main>
  </div>
);

const MarketPage = () => <div>마켓 탐색 및 리스트(준비 중)</div>;
const HistroyPage = () => <div>투자 내역 리포트(준비 중)</div>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <MarketPage /> },
      {
        path: "trade/:symbol",
        element: (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            <div className='lg:col-span-2'>
              <CandlestickChart />
            </div>
            <div className='bg-slate-900 p-4 rounded-xl border border-slate-800 text-slate-500 text-center py-20'>
              호가창 영역
            </div>
          </div>
        ),
      },
      { path: "history", element: <HistroyPage /> },
    ],
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

export default App;
