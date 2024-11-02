import { redirect } from 'next/navigation'

const HomePage: React.FC = () => {
  redirect('/dashboard/order')
};

export default HomePage;