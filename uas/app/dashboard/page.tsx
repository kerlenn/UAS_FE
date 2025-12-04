"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { allCourses, Course } from '@/lib/courses';
import '../styles/dashboard.css';

interface EnrolledCourse extends Course {
  progress: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [myCourses, setMyCourses] = useState<EnrolledCourse[]>([]);
  const [lastAccessed, setLastAccessed] = useState<EnrolledCourse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const savedPurchases = localStorage.getItem('purchasedCourses');
    const purchasedIds: number[] = savedPurchases ? JSON.parse(savedPurchases) : [];

    const coursesFound = allCourses.filter(course => purchasedIds.includes(course.id));

    const coursesWithProgress = coursesFound.map(course => {
      const randomProgress = Math.floor(Math.random() * 100); 
      return { ...course, progress: randomProgress };
    });

    setMyCourses(coursesWithProgress);

    if (coursesWithProgress.length > 0) {
      const ongoing = coursesWithProgress.filter(c => c.progress < 100);
      const bestCourse = ongoing.length > 0 
        ? ongoing.reduce((prev, current) => (prev.progress > current.progress) ? prev : current)
        : coursesWithProgress[0];
      
      setLastAccessed(bestCourse);
    }

    setLoading(false);
  }, [router]);

  if (loading) return <div style={{textAlign:'center', marginTop:'50px'}}>Loading Dashboard...</div>;

  return (
    <div className="container">
      <main className="learning-dashboard">
        <h1>Dasbor Belajar Saya</h1>

        <div className="continue-learning-section">
          <h2>Lanjut Belajar</h2>
          
          {lastAccessed ? (
            <Link href={lastAccessed.slug} className="course-card-large-link">
              <div className="course-card-large">
                <div className="thumbnail-wrapper">
                  <Image 
                    src={lastAccessed.image} 
                    alt={lastAccessed.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="info">
                  <h3>{lastAccessed.title}</h3>
                  <p>Lanjutkan progres belajar kamu dan selesaikan kursus untuk mendapatkan sertifikat.</p>
                  
                  <div className="progress-bar-container">
                    <div className="progress-bar-fill" style={{ width: `${lastAccessed.progress}%` }}></div>
                  </div>
                  <p className="progress-text">{lastAccessed.progress}% Selesai</p>
                </div>
              </div>
            </Link>
          ) : (
            <div className="no-courses-message">
              <p>Kamu belom mulai kursus.</p>
              <Link href="/kursus" className="more-btn">Mulai Sekarang?</Link>
            </div>
          )}
        </div>

        <div className="my-courses-section">
          <h2>Kursus Saya</h2>
          
          {myCourses.length > 0 ? (
            <div className="courses-grid">
              {myCourses.map(course => (
                <Link key={course.id} href={course.slug} className="course-card-link">
                  <div className="course-card-dashboard">
                    <div className="thumbnail-wrapper">
                      <Image 
                        src={course.image} 
                        alt={course.title} 
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="info">
                      <h3>{course.title}</h3>
                      <div className="progress-bar-container">
                        <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                      </div>
                      <p className="progress-text">{course.progress}% Selesai</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="no-courses-message">
              <p>Kamu belom ada kursus.</p>
              <Link href="/kursus" className="more-btn">Mau liat Kursusnya</Link>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}