// src/components/shared/Card.jsx
export default function Card({ title, children }) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {title && (
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
          </div>
        )}
        <div className="px-4 py-5 sm:p-6">{children}</div>
      </div>
    );
  }