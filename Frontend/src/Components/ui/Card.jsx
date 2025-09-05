import React from 'react';

export default function Card({
  title,
  description,
  icon,
  footer,
  className = '',
  children,
}) {
  return (
    <div className={`bg-white dark:bg-black rounded-lg shadow-lg border border-gray-200 dark:border-green-800 p-6 transition-all duration-300 hover:shadow-xl ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          {title && <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>}
          {description && <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>}
        </div>
        {icon && <div className="text-blue-500 dark:text-green-400">{icon}</div>}
      </div>

      {children && (
        <div className="text-3xl font-bold text-blue-600 dark:text-green-400">
          {children}
        </div>
      )}

      {footer && (
        <div className="mt-4 border-t pt-3 border-gray-200 dark:border-green-700 text-sm text-gray-600 dark:text-gray-300">
          {footer}
        </div>
      )}
    </div>
  );
}
