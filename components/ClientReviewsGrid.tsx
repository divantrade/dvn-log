"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { sanityClientSide, urlForClientSide } from '@/lib/sanity/client-side';
import { clientReviewsQuery } from '@/lib/sanity/queries';

interface ClientReview {
  _id: string;
  companyName: string;
  companyLogo: { asset: { _ref: string } };
  companyWebsite: string;
  reviewScreenshot: { asset: { _ref: string } };
  displayOrder: number;
}

const ClientReviewsGrid = () => {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await sanityClientSide.fetch(clientReviewsQuery);
        setReviews(data || []);
      } catch (error) {
        console.error('Error fetching client reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div key={i} className="bg-white rounded-2xl shadow-lg animate-pulse">
          {/* Top section skeleton */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-center">
              <div className="w-24 h-24 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
          {/* Bottom section skeleton */}
          <div className="p-4">
            <div className="w-full h-32 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty State
  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No client reviews yet</h3>
      <p className="text-gray-600">Check back soon for client testimonials and reviews.</p>
    </div>
  );

  if (loading) {
    return (
      <section className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">What our clients say</h2>
        <LoadingSkeleton />
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="mx-auto max-w-7xl px-6">
        <h2 className="text-2xl font-semibold tracking-tight mb-8">What our clients say</h2>
        <EmptyState />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6">
      <h2 className="text-2xl font-semibold tracking-tight mb-8">What our clients say</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
          >
            {/* Top Section - Company Logo */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
              <div className="flex items-center justify-center">
                <a
                  href={review.companyWebsite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:scale-105 transition-transform duration-200"
                >
                  <Image
                    src={urlForClientSide(review.companyLogo).width(120).height(120).url()}
                    alt={`${review.companyName} logo`}
                    width={120}
                    height={120}
                    className="w-24 h-24 object-contain rounded-lg"
                  />
                </a>
              </div>
              <div className="text-center mt-3">
                <h3 className="font-semibold text-gray-900 text-sm">
                  {review.companyName}
                </h3>
              </div>
            </div>

            {/* Bottom Section - Review Screenshot */}
            <div className="p-4">
              <div className="relative group cursor-pointer">
                <Image
                  src={urlForClientSide(review.reviewScreenshot).width(400).height(300).url()}
                  alt={`Review from ${review.companyName}`}
                  width={400}
                  height={300}
                  className="w-full h-32 object-cover rounded-lg group-hover:scale-105 transition-transform duration-200"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Display Order Badge (for admin reference) */}
            <div className="absolute top-2 right-2">
              <span className="inline-flex items-center justify-center w-6 h-6 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                {review.displayOrder}
              </span>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .grid > div {
          animation: slideIn 0.6s ease-out forwards;
        }

        .grid > div:nth-child(1) { animation-delay: 0.1s; }
        .grid > div:nth-child(2) { animation-delay: 0.2s; }
        .grid > div:nth-child(3) { animation-delay: 0.3s; }
        .grid > div:nth-child(4) { animation-delay: 0.4s; }
        .grid > div:nth-child(5) { animation-delay: 0.5s; }
        .grid > div:nth-child(6) { animation-delay: 0.6s; }
        .grid > div:nth-child(7) { animation-delay: 0.7s; }
        .grid > div:nth-child(8) { animation-delay: 0.8s; }
        .grid > div:nth-child(9) { animation-delay: 0.9s; }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .grid > div {
            animation: none;
          }
          
          .hover\\:scale-105:hover,
          .group-hover\\:scale-105 {
            transform: none;
          }
          
          .hover\\:-translate-y-1:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientReviewsGrid;
