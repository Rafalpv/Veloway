import Header from '../components/Header'
import TableUsers from '../components/TableUsers'

const Dashboard = () => {
  return (
    <div className='bg-backgraound-admin h-screen font-poppins'>
      < Header />
      <main>
        <TableUsers />
      </main>
    </div>
  )
}

export default Dashboard
