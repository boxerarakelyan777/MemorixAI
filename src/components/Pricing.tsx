'use client';

import React from 'react';

// Stripe Plans
const plans = [
  {
    name: 'Free Plan',
    price: 0,
    link: '#',
    features: [
      '5 flashcard generations per month',
      '2 saved flashcard sets',
      'No access to flashcard games',
    ],
  },
  {
    name: 'Pro Plan',
    price: 1,
    link: 'https://buy.stripe.com/test_fZeeWTd1Kd4h46YeUU',
    priceId: 'price_1PoeXzBGuZJEG2quSrgzetsk',
    features: [
      'Unlimited text to flashcard generation',
      '500 doc to flashcard generations per month',
      'Unlimited saved flashcard sets',
      'Limited access to flashcard games',
    ],
  },
  {
    name: 'Enterprise',
    price: 5,
    link: 'https://buy.stripe.com/test_6oE01Z8Lu7JXavmcMN',
    priceId: 'price_1PoebEBGuZJEG2qu67A2rEW5',
    features: [
      'Unlimited text to flashcard generation',
      'Unlimited doc to flashcard generation',
      'Unlimited saved flashcard sets',
      'Unlimited access to flashcard games',
    ],
  },
];

const Pricing: React.FC = () => {
  const getButtonLink = (plan: { price: number; link: string }) => {
    if (plan.price === 0) return '#';
    return plan.link;
  };

  return (
    <section id="pricing" className="bg-white dark:bg-gray-900">
      <div className="px-4  py-24 mx-auto max-w-screen-xl lg:py-24 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Choose the Best Plan for Your Learning Journey
          </h2>
          <p className="mb-5 font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Explore our flexible pricing plans to suit your study needs. Whether you&apos;re a solo learner or a team, we&apos;ve got you covered.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow dark:border-gray-600 xl:p-8 dark:bg-gray-800 dark:text-white">
              <h3 className="mb-4 text-2xl font-semibold">{plan.name}</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                {plan.name === 'Free Plan' ? 'Ideal for personal use to explore the features.' : plan.name === 'Pro Plan' ? 'Best for advanced users who need more features.' : 'Perfect for large organizations and teams.'}
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">${plan.price}</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 011.414 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <a
                  href={getButtonLink(plan)}
                  target="_blank"
                  className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white dark:focus:ring-blue-900"
                >
                  {plan.price === 0 ? 'Coming Soon' : 'Subscribe'}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;