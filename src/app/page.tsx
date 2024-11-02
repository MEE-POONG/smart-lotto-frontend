import { redirect } from 'next/navigation'

const HomePage: React.FC = () => {
  redirect('/dashboard')
};

export default HomePage;