"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { safeSanityFetch, urlForClientSide } from '@/lib/sanity/client-side';
import { clientReviewsQuery } from '@/lib/sanity/queries';

interface ClientReview {
  _id: string;
  companyName: string;
  companyLogo: { asset: { _ref: string } };
  companyWebsite: string;
  reviewScreenshot: { asset: { _ref: string } };
  displayOrder: number;
}

const ClientReviewsSection = () => {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await safeSanityFetch(clientReviewsQuery);
        setReviews(data || []);
      } catch (error) {
        console.error('Error fetching client reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Modal handlers
  const openModal = (imageUrl: string) => {
    setModalImage(imageUrl);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeModal = () => {
    setModalImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalImage) {
        closeModal();
      }
    };

    if (modalImage) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalImage]);

  // Loading Skeleton
  const LoadingSkeleton = () => (
    <div className="client-reviews-grid">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <div key={i} className="client-review-card animate-pulse">
          {/* Logo section skeleton */}
          <div className="logo-section">
            <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto"></div>
          </div>
          {/* Screenshot section skeleton */}
          <div className="screenshot-section">
            <div className="w-full h-full bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty State
  const EmptyState = () => (
    <div className="text-center py-16">
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
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Reviews</h2>
          <p className="text-lg text-gray-600">What our partners say about working with us</p>
        </div>
        <LoadingSkeleton />
      </section>
    );
  }

  if (!reviews.length) {
    return (
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Reviews</h2>
          <p className="text-lg text-gray-600">What our partners say about working with us</p>
        </div>
        <EmptyState />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Reviews</h2>
        <p className="text-lg text-gray-600">What our partners say about working with us</p>
      </div>
      
      <div className="client-reviews-grid">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="client-review-card group"
          >
            {/* Logo Section */}
            <div className="logo-section">
              <a
                href={review.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="company-logo-link"
                aria-label={`Visit ${review.companyName} website`}
              >
                <Image
                  src={urlForClientSide(review.companyLogo).width(50).height(50).url()}
                  alt={`${review.companyName} logo`}
                  width={50}
                  height={50}
                  className="company-logo"
                />
              </a>
              <h4 className="company-name">{review.companyName}</h4>
            </div>

            {/* Screenshot Section */}
            <div className="screenshot-section">
              <Image
                src={urlForClientSide(review.reviewScreenshot).width(400).height(300).url()}
                alt={`Review from ${review.companyName}`}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                onClick={() => openModal(urlForClientSide(review.reviewScreenshot).width(1200).height(900).url())}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {modalImage && (
        <div 
          className="image-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="modal-content">
            <button 
              className="close-button"
              onClick={closeModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <Image
              src={modalImage}
              alt="Review screenshot enlarged"
              width={1200}
              height={900}
              className="modal-image"
              priority
            />
          </div>
        </div>
      )}

      <style jsx>{`
        .client-reviews-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }

        .client-review-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }

        .client-review-card:hover {
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          transform: translateY(-2px);
        }

        .logo-section {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          border-bottom: 1px solid #e2e8f0;
        }

        .company-logo-link {
          display: block;
          transition: transform 0.2s ease;
        }

        .company-logo-link:hover {
          transform: scale(1.05);
        }

        .company-logo {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .company-name {
          margin: 0;
          font-size: 1rem;
          font-weight: 600;
          color: #1f2937;
          line-height: 1.2;
        }

        .screenshot-section {
          height: 200px;
          overflow: hidden;
          position: relative;
        }

        /* Tablet Responsive */
        @media (max-width: 1024px) {
          .client-reviews-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
        }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .client-reviews-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .screenshot-section {
            height: 160px;
          }

          .logo-section {
            flex-direction: column;
            gap: 0.5rem;
            text-align: center;
            padding: 0.75rem;
          }

          .company-name {
            font-size: 0.875rem;
          }
        }

        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .client-review-card,
          .client-review-card:hover,
          .group-hover\\:scale-105,
          .hover\\:scale-105:hover {
            transform: none;
            transition: none;
          }
        }

        /* Animation delays for staggered entrance */
        .client-review-card:nth-child(1) { animation-delay: 0.1s; }
        .client-review-card:nth-child(2) { animation-delay: 0.2s; }
        .client-review-card:nth-child(3) { animation-delay: 0.3s; }
        .client-review-card:nth-child(4) { animation-delay: 0.4s; }
        .client-review-card:nth-child(5) { animation-delay: 0.5s; }
        .client-review-card:nth-child(6) { animation-delay: 0.6s; }
        .client-review-card:nth-child(7) { animation-delay: 0.7s; }
        .client-review-card:nth-child(8) { animation-delay: 0.8s; }
        .client-review-card:nth-child(9) { animation-delay: 0.9s; }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .client-review-card {
          animation: slideInUp 0.6s ease-out forwards;
          opacity: 0;
        }

        /* Image Modal Styles */
        .image-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          animation: fadeIn 0.3s ease-out;
        }

        .modal-content {
          position: relative;
          max-width: 90vw;
          max-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-image {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .close-button {
          position: absolute;
          top: -3rem;
          right: -1rem;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          font-size: 2rem;
          width: 3rem;
          height: 3rem;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          backdrop-filter: blur(10px);
        }

        .close-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Mobile Modal Adjustments */
        @media (max-width: 640px) {
          .image-modal-overlay {
            padding: 1rem;
          }

          .close-button {
            top: -2.5rem;
            right: -0.5rem;
            width: 2.5rem;
            height: 2.5rem;
            font-size: 1.5rem;
          }

          .modal-image {
            /* Enable pinch-to-zoom on mobile */
            touch-action: pinch-zoom;
          }
        }
      `}</style>
    </section>
  );
};

export default ClientReviewsSection;
