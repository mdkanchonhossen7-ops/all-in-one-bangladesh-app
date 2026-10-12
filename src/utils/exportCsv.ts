import { DirectoryItem, TuitionPost, BloodDonor } from '../types';

/**
 * Escapes a cell value for standard CSV format (RFC 4180).
 * Wraps values in double quotes if they contain commas, quotes, or newlines,
 * and escapes internal double quotes by doubling them.
 */
function escapeCsvCell(val: unknown): string {
  if (val === null || val === undefined) return '""';
  let str = String(val);
  // Replace internal double quotes with two double quotes
  str = str.replace(/"/g, '""');
  // Always wrap in quotes for safety and unicode support
  return `"${str}"`;
}

/**
 * Initiates browser file download with UTF-8 BOM so Excel opens Bengali & Unicode text properly.
 */
function downloadCsv(csvContent: string, fileName: string) {
  // UTF-8 BOM prefix (\uFEFF) forces Microsoft Excel, Numbers, and Google Sheets to parse UTF-8 Unicode correctly
  const bom = '\uFEFF';
  const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Export Directory Listings to CSV
 */
export function exportDirectoryListingsToCsv(items: DirectoryItem[], customTitle = 'all_directory_listings') {
  const headers = [
    'ID',
    'Title (Bengali)',
    'Title (English)',
    'Category',
    'Subcategory (Bengali)',
    'Subcategory (English)',
    'Division',
    'District',
    'Upazila',
    'Full Address (Bengali)',
    'Full Address (English)',
    'Phone',
    'WhatsApp',
    'Daily Wage / Rate (Bengali)',
    'Daily Wage / Rate (English)',
    'Verified Status',
    'Moderation Status',
    'Star Rating',
    'Review Count',
    'Badge',
    'Self-Posted',
    'Created Date',
  ];

  const rows = items.map((item) => [
    escapeCsvCell(item.id),
    escapeCsvCell(item.titleBn || item.title),
    escapeCsvCell(item.title),
    escapeCsvCell(item.category),
    escapeCsvCell(item.subcategoryBn || item.subcategory),
    escapeCsvCell(item.subcategory),
    escapeCsvCell(item.division),
    escapeCsvCell(item.district),
    escapeCsvCell(item.upazila),
    escapeCsvCell(item.addressBn || item.address),
    escapeCsvCell(item.address),
    escapeCsvCell(item.phone),
    escapeCsvCell(item.whatsapp || item.phone),
    escapeCsvCell(item.dailyRateBn || item.dailyRate || 'N/A'),
    escapeCsvCell(item.dailyRate || 'N/A'),
    escapeCsvCell(item.verified ? 'Verified' : 'Unverified'),
    escapeCsvCell(item.status),
    escapeCsvCell(item.rating),
    escapeCsvCell(item.reviewCount),
    escapeCsvCell(item.badgeBn || item.badge || ''),
    escapeCsvCell(item.isSelfPost ? 'Yes (Public Self-Post)' : 'Official Entry'),
    escapeCsvCell(item.createdAt),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadCsv(csvContent, `all_in_one_bangladesh_${customTitle}_${dateStr}.csv`);
}

/**
 * Export Tuition Matchmaking Posts to CSV
 */
export function exportTuitionsToCsv(tuitions: TuitionPost[]) {
  const headers = [
    'ID',
    'Post Type',
    'Name',
    'Phone',
    'WhatsApp',
    'Division',
    'District',
    'Upazila',
    'Classes / Grades',
    'Subjects',
    'Medium',
    'Expected Salary / Fee',
    'Institute / Area',
    'NID Verified',
    'Moderation Status',
    'Created Date',
  ];

  const rows = tuitions.map((t) => [
    escapeCsvCell(t.id),
    escapeCsvCell(t.type === 'teacher_available' ? 'Teacher Offering Tuition' : 'Guardian Seeking Tutor'),
    escapeCsvCell(t.name),
    escapeCsvCell(t.phone),
    escapeCsvCell(t.whatsapp || t.phone),
    escapeCsvCell(t.division),
    escapeCsvCell(t.district),
    escapeCsvCell(t.upazila),
    escapeCsvCell(t.classes.join('; ')),
    escapeCsvCell(t.subjects.join('; ')),
    escapeCsvCell(t.medium),
    escapeCsvCell(t.salary),
    escapeCsvCell(t.institute || ''),
    escapeCsvCell(t.nidVerified ? 'Yes' : 'No'),
    escapeCsvCell(t.status),
    escapeCsvCell(t.createdAt),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadCsv(csvContent, `all_in_one_bangladesh_tuitions_${dateStr}.csv`);
}

/**
 * Export Blood Donors Directory to CSV
 */
export function exportBloodDonorsToCsv(donors: BloodDonor[]) {
  const headers = [
    'ID',
    'Donor Name',
    'Blood Group',
    'Phone',
    'WhatsApp',
    'Division',
    'District',
    'Upazila',
    'Availability Status',
    'Donation Count',
    'Last Donated Date',
    'Verified',
    'Registered Date',
  ];

  const rows = donors.map((d) => [
    escapeCsvCell(d.id),
    escapeCsvCell(d.name),
    escapeCsvCell(d.bloodGroup),
    escapeCsvCell(d.phone),
    escapeCsvCell(d.whatsapp || d.phone),
    escapeCsvCell(d.division),
    escapeCsvCell(d.district),
    escapeCsvCell(d.upazila),
    escapeCsvCell(d.isAvailable ? 'Available' : 'Resting / Unavailable'),
    escapeCsvCell(d.donationCount),
    escapeCsvCell(d.lastDonationDate || 'Not recorded'),
    escapeCsvCell(d.verified ? 'Verified' : 'Pending'),
    escapeCsvCell(d.createdAt),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadCsv(csvContent, `all_in_one_bangladesh_blood_donors_${dateStr}.csv`);
}

/**
 * Export Complete Platform JSON Backup
 */
export function exportFullPlatformBackup(data: Record<string, unknown>) {
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  link.setAttribute('href', url);
  link.setAttribute('download', `all_in_one_bangladesh_full_backup_${dateStr}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
