import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, X, Crown, Zap } from 'lucide-react';
import Button from '../components/common/Button';
import { useAuth } from '../hooks/useAuth';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Basic access to practice materials',
    icon: Zap,
    features: [
      'Access to basic practice questions',
      'Limited mock tests',
      'Basic performance tracking',
      'Community forum access',
    ],
    limitations: [
      'Limited question bank',
      'No AI-powered feedback',
      'Basic analytics only',
      'No premium mock tests',
    ],
  },
  {
    name: 'Premium',
    price: '19.99',
    description: 'Full access to all features',
    icon: Crown,
    features: [
      'Unlimited practice questions',
      'Unlimited mock tests',
      'AI-powered feedback',
      'Advanced analytics',
      'Priority support',
      'Personalized study plan',
      'Progress tracking',
      'Performance insights',
    ],
    recommended: true,
  },
];

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (planName: string) => {
    setIsProcessing(true);
    try {
      // Here you would integrate with your payment provider
      console.log(`Subscribing to ${planName} plan`);
      // After successful subscription
      navigate('/dashboard');
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-gray-50 pt-16 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Plan</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the perfect plan to help you achieve your PTE Academic goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-soft overflow-hidden ${
                plan.recommended ? 'border-2 border-primary-500' : ''
              }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-0 bg-primary-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Recommended
                </div>
              )}

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
                    <div className="mt-2">
                      <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                      {plan.price !== '0' && <span className="text-gray-500 ml-2">/month</span>}
                    </div>
                  </div>
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <plan.icon className="w-8 h-8 text-primary-600" />
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{plan.description}</p>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-success-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}

                  {plan.limitations?.map((limitation) => (
                    <div key={limitation} className="flex items-start">
                      <X className="w-5 h-5 text-gray-400 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-gray-500">{limitation}</span>
                    </div>
                  ))}
                </div>

                <Button
                  variant={plan.recommended ? 'primary' : 'outline'}
                  fullWidth
                  size="lg"
                  onClick={() => handleSubscribe(plan.name)}
                  isLoading={isProcessing && selectedPlan === plan.name}
                >
                  {plan.price === '0' ? 'Get Started' : 'Subscribe Now'}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">100% Satisfaction Guaranteed</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try our premium plan risk-free for 7 days. If you're not completely satisfied, we'll refund
            your payment - no questions asked.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;