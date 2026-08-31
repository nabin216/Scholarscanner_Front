// import React from 'react';
// import { Scholarship, ScholarshipCategory, ScholarshipLevel, FieldOfStudy } from '../types/scholarship';

// interface ScholarshipCardProps {
//     scholarship: Scholarship;
// }

// const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship }) => {
//     const {
//         title,
//         description,
//         deadline,
//         country,
//         levels,
//         field_of_study,
//         scholarship_category,
//         application_url,
//         is_featured,
//     } = scholarship;

//     return (
//         <div className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow">
//             <div className="flex justify-between items-start mb-2">
//                 <h2 className="text-xl font-bold text-blue-600">{title}</h2>
//                 {is_featured && (
//                     <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
//                         Featured
//                     </span>
//                 )}
//             </div>
            
//             <div dangerouslySetInnerHTML={{ __html: description }} className="text-gray-600 mt-2 text-sm line-clamp-3" />
            
//             <div className="flex flex-wrap gap-2 mt-3">
//                 {country && (
//                     <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
//                         {country}
//                     </span>
//                 )}
//                 {scholarship_category.map((cat: ScholarshipCategory) => (
//                     <span key={cat.id} className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
//                         {cat.name}
//                     </span>
//                 ))}
//             </div>

//             <div className="mt-2">
//                 {levels.length > 0 && (
//                     <div className="text-gray-600 text-sm">
//                         <span className="font-medium">Level:</span>{' '}
//                         {levels.map((level: ScholarshipLevel) => level.name).join(', ')}
//                     </div>
//                 )}
//                 {field_of_study.length > 0 && (
//                     <div className="text-gray-600 text-sm">
//                         <span className="font-medium">Fields:</span>{' '}
//                         {field_of_study.map((field: FieldOfStudy) => field.name).join(', ')}
//                     </div>
//                 )}
//             </div>

//             {deadline && (
//                 <p className="text-gray-500 text-sm mt-2">
//                     Deadline: {new Date(deadline).toLocaleDateString()}
//                 </p>
//             )}

//             <div className="mt-4 flex gap-2">
//                 <a 
//                     href={`/scholarships/${scholarship.id}`}
//                     className="inline-block bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
//                 >
//                     View Details
//                 </a>
//                 {application_url && (
//                     <a 
//                         href={application_url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
//                     >
//                         Apply Now
//                     </a>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ScholarshipCard;