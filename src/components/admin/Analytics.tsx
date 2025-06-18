import React, { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Analytics: React.FC = () => {
  const [userCount, setUserCount] = useState(0);
  const [activeUserCount, setActiveUserCount] = useState(0);
  const [tripCount, setTripCount] = useState(0);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);
  const [featuredTripCount, setFeaturedTripCount] = useState(0);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    const now = Date.now();
    const usersSnapshot = await getDocs(collection(db, 'users'));
    setUserCount(usersSnapshot.size);

    const activeUsers = usersSnapshot.docs.filter((doc) => {
      const lastSeen = doc.data().lastSeen;
      if (lastSeen instanceof Timestamp) {
        const lastSeenTime = lastSeen.toMillis();
        return now - lastSeenTime < 5 * 60 * 1000; // active in last 5 mins
      }
      return false;
    });
    setActiveUserCount(activeUsers.length);

    const tripsSnapshot = await getDocs(collection(db, 'trips'));
    setTripCount(tripsSnapshot.size);

    const featuredTrips = tripsSnapshot.docs.filter((doc) => doc.data().featured);
    setFeaturedTripCount(featuredTrips.length);

    const messagesSnapshot = await getDocs(collection(db, 'contactSubmissions'));
    const unreadMessages = messagesSnapshot.docs.filter((doc) => !doc.data().read);
    setUnreadMessagesCount(unreadMessages.length);
  };

  const chartOptions = (title: string) => ({
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: title,
        color: 'white',
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { color: 'white' } },
      y: { ticks: { color: 'white' } },
    },
  });

  const makeChartData = (label: string, data: number[], bgColor: string[]) => ({
    labels: [label],
    datasets: [
      {
        label: label,
        data,
        backgroundColor: bgColor,
        borderRadius: 8,
      },
    ],
  });

  const lineChartData = {
    labels: ['Users', 'Trips', 'Unread Msgs', 'Featured Trips', 'Active Users'],
    datasets: [
      {
        label: 'Platform Data Overview',
        data: [userCount, tripCount, unreadMessagesCount, featuredTripCount, activeUserCount],
        fill: false,
        borderColor: '#82aae3',
        backgroundColor: '#82aae3',
        tension: 0.3,
        pointBorderWidth: 2,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: 'white' } },
      title: {
        display: true,
        text: 'Combined Overview (Line Chart)',
        color: 'white',
        font: { size: 18 },
      },
    },
    scales: {
      x: { ticks: { color: 'white' } },
      y: { ticks: { color: 'white' } },
    },
  };

  return (
    <div className="bg-black text-white p-6 rounded-2xl space-y-10 shadow-xl">
      <h2 className="text-3xl font-bold mb-6">Analytics Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 p-4 rounded-2xl">
          <Bar
            data={makeChartData('Users', [userCount], ['#82aae3'])}
            options={chartOptions('Total Users')}
          />
        </div>

        <div className="bg-white/10 p-4 rounded-2xl">
          <Bar
            data={makeChartData('Trips', [tripCount], ['#7a9d7c'])}
            options={chartOptions('Total Trips')}
          />
        </div>

        <div className="bg-white/10 p-4 rounded-2xl">
          <Bar
            data={makeChartData('Unread Messages', [unreadMessagesCount], ['#e63946'])}
            options={chartOptions('Unread Messages')}
          />
        </div>

        <div className="bg-white/10 p-4 rounded-2xl">
          <Bar
            data={makeChartData('Featured Trips', [featuredTripCount], ['#f7b801'])}
            options={chartOptions('Featured Trips')}
          />
        </div>

        {/* ✅ NEW CHART FOR ACTIVE USERS */}
        <div className="bg-white/10 p-4 rounded-2xl">
          <Bar
            data={makeChartData('Active Users', [activeUserCount], ['#3ddc97'])}
            options={chartOptions('Active Users (Last 5 Min)')}
          />
        </div>

        {/* LINE CHART BELOW */}
        <div className="md:col-span-2 bg-white/10 p-4 rounded-2xl">
          <Line data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
