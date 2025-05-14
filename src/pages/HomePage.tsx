import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mic,
  Edit,
  BookOpen,
  Headphones,
  ArrowRight,
  Clock,
  Award,
  BarChart,
  Users,
} from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const skillItems = [
    {
      icon: <Mic className="h-6 w-6 text-white" />,
      title: 'Speaking',
      description:
        'Practice speaking with real-time feedback on pronunciation, fluency, and content.',
      color: 'bg-primary-600',
      link: '/practice/speaking',
    },
    {
      icon: <Edit className="h-6 w-6 text-white" />,
      title: 'Writing',
      description:
        'Improve your writing skills with AI-powered feedback on structure, grammar, and content.',
      color: 'bg-secondary-500',
      link: '/practice/writing',
    },
    {
      icon: <BookOpen className="h-6 w-6 text-white" />,
      title: 'Reading',
      description:
        'Enhance your reading comprehension with various practice exercises and assessments.',
      color: 'bg-accent-500',
      link: '/practice/reading',
    },
    {
      icon: <Headphones className="h-6 w-6 text-white" />,
      title: 'Listening',
      description:
        'Sharpen your listening skills with audio exercises designed to test comprehension.',
      color: 'bg-success-500',
      link: '/practice/listening',
    },
  ];

  const features = [
    {
      icon: <Clock size={32} className="text-primary-500" />,
      title: 'Realistic Timing',
      description: 'Practice under the same time constraints as the actual PTE exam.'
    },
    {
      icon: <Award size={32} className="text-secondary-500" />,
      title: 'AI Scoring',
      description: 'Get instant feedback and scores powered by advanced AI technology.'
    },
    {
      icon: <BarChart size={32} className="text-accent-500" />,
      title: 'Performance Analytics',
      description: 'Track your progress with detailed analytics and improvement suggestions.'
    },
    {
      icon: <Users size={32} className="text-success-500" />,
      title: 'Community Support',
      description: 'Connect with other test-takers and learn from shared experiences.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate={isVisible ? 'visible' : 'hidden'}
              variants={fadeIn}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Master the PTE Academic Exam with Confidence
              </h1>
              <p className="mt-4 text-xl text-gray-600 max-w-lg">
                Practice all sections of the PTE Academic test with our AI-powered platform that
                simulates the real test environment.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button href="/mock-tests" variant="primary" size="lg">
                  Start Mock Test
                </Button>
                <Button href="/practice" variant="outline" size="lg">
                  Practice by Section
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 rounded-2xl shadow-lg p-6 md:p-8 text-white">
                <h3 className="text-xl font-semibold mb-4">PTE Academic Test Format</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-white text-primary-600 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium">Speaking & Writing</p>
                      <p className="text-white text-opacity-90 text-sm">77-93 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-white text-primary-600 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium">Reading</p>
                      <p className="text-white text-opacity-90 text-sm">32-41 minutes</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-white text-primary-600 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="font-medium">Listening</p>
                      <p className="text-white text-opacity-90 text-sm">45-57 minutes</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-white border-opacity-20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Total Duration</p>
                      <p className="text-2xl font-bold">~3 hours</p>
                    </div>
                    <Button
                      href="/about-pte"
                      variant="outline"
                      className="text-white border-white hover:bg-white hover:text-primary-600"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="absolute -z-10 inset-0 bg-primary-200 rounded-2xl transform rotate-3 translate-x-4 translate-y-4"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900"
            >
              Practice by Skill
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Focus on specific areas of the PTE Academic test to improve your performance
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-medium overflow-hidden"
              >
                <div className={`p-4 ${item.color}`}>
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    {item.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <Link
                    to={item.link}
                    className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                  >
                    Start practicing <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-gray-900"
            >
              Why Choose Our Platform
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Designed to help you achieve your best score in the PTE Academic exam
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-medium text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-white"
            >
              Ready to ace your PTE Academic exam?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-4 text-xl text-white text-opacity-90 max-w-3xl mx-auto"
            >
              Join thousands of students who have improved their scores with our platform
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <Button
                href={user ? '/dashboard' : '/register'}
                variant="outline"
                size="lg"
                className="text-white border-white hover:bg-white hover:text-primary-600"
              >
                {user ? 'Go to Dashboard' : 'Get Started for Free'}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;