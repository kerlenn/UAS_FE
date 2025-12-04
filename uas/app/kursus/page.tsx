"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './kursus.css';
import { allCourses } from '@/lib/courses'; 

type Filters = {
  video: string[];
  materi: string[];
  harga: string[];
  level: string[];
};

export default function KursusPage() {
  const [purchasedIds, setPurchasedIds] = useState<number[]>([]);

  useEffect(() => {
    const savedPurchases = localStorage.getItem('purchasedCourses');
    if (savedPurchases) {
      try {
        setPurchasedIds(JSON.parse(savedPurchases));
      } catch (e) {
        console.error("Gagal memuat data pembelian", e);
      }
    }
  }, []);

  const [filters, setFilters] = useState<Filters>({
    video: [],
    materi: [],
    harga: [],
    level: [],
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    setFilters((prevFilters) => {
      const currentGroupFilters = prevFilters[name as keyof Filters];
      
      let newGroupFilters: string[];
      if (checked) {
        newGroupFilters = [...currentGroupFilters, value];
      } else {
        newGroupFilters = currentGroupFilters.filter((item) => item !== value);
      }
      
      return {
        ...prevFilters,
        [name]: newGroupFilters,
      };
    });
  };

  const filteredCourses = useMemo(() => {
    let tempCourses = [...allCourses]; 

    if (filters.video.length > 0) {
      tempCourses = tempCourses.filter(course => 
        filters.video.some(range => {
          if (range === '1-10') return course.videoCount >= 1 && course.videoCount <= 10;
          if (range === '11-20') return course.videoCount >= 11 && course.videoCount <= 20;
          return false;
        })
      );
    }

    if (filters.materi.length > 0) {
      tempCourses = tempCourses.filter(course => 
        filters.materi.includes(course.materi)
      );
    }

    if (filters.harga.length > 0) {
      tempCourses = tempCourses.filter(course => 
        filters.harga.some(range => {
          if (range === 'gratis') return course.price === 0;
          if (range === '<200k') return course.price > 0 && course.price < 200000;
          if (range === '>200k') return course.price >= 200000;
          return false;
        })
      );
    }

    if (filters.level.length > 0) {
      tempCourses = tempCourses.filter(course => 
        filters.level.includes(course.level)
      );
    }

    return tempCourses;

  }, [filters]);

  return (
    <div className="container my-4">
      <main>
        <div className="main-header">
          <div className="breadcrumbs">
            <p><Link href="/" style={{ textDecoration: 'none', color: '#333' }}>← Home</Link> Kursus</p>
          </div>
          <h2>Kursus</h2>
          <p>Jelajahi kursus dari para pakar berpengalaman di dunia nyata!</p>
        </div>

        <div className="row g-4">
          <div className="col-lg-4 col-xl-3">
            <aside className="filters">
              {/* ... Bagian Filter Tetap Sama ... */}
              <div className="filter-group">
                <h3>Banyak Video</h3>
                <div className="filter-option">
                  <input type="checkbox" id="v1" name="video" value="1-10" onChange={handleFilterChange} />
                  <label htmlFor="v1">1 - 10 Video (3)</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="v2" name="video" value="11-20" onChange={handleFilterChange} />
                  <label htmlFor="v2">11 - 20 Video (2)</label>
                </div>
              </div>

              <div className="filter-group">
                <h3>Materi</h3>
                <div className="filter-option">
                  <input type="checkbox" id="m1" name="materi" value="Adobe" onChange={handleFilterChange} />
                  <label htmlFor="m1">Adobe (1)</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="m2" name="materi" value="Blender" onChange={handleFilterChange} />
                  <label htmlFor="m2">Blender (1)</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="m3" name="materi" value="Roblox" onChange={handleFilterChange} />
                  <label htmlFor="m3">Roblox (1)</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="m4" name="materi" value="Programming" onChange={handleFilterChange} />
                  <label htmlFor="m4">Programming (2)</label>
                </div>
              </div>
              
              <div className="filter-group">
                <h3>Harga</h3>
                <div className="filter-option">
                  <input type="checkbox" id="p1" name="harga" value="gratis" onChange={handleFilterChange} />
                  <label htmlFor="p1">Gratis (1)</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="p2" name="harga" value="<200k" onChange={handleFilterChange} />
                  <label htmlFor="p2">&lt; Rp 200.000 (3)</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="p3" name="harga" value=">200k" onChange={handleFilterChange} />
                  <label htmlFor="p3">&gt; Rp 200.000 (1)</label>
                </div>
              </div>

              <div className="filter-group">
                <h3>Level</h3>
                <div className="filter-option">
                  <input type="checkbox" id="l1" name="level" value="Beginner" onChange={handleFilterChange} />
                  <label htmlFor="l1">Beginner (2)</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="l2" name="level" value="Intermediate" onChange={handleFilterChange} />
                  <label htmlFor="l2">Intermediate (2)</label>
                </div>
                <div className="filter-option">
                  <input type="checkbox" id="l3" name="level" value="Professional" onChange={handleFilterChange} />
                  <label htmlFor="l3">Professional (1)</label>
                </div>
              </div>
            </aside>
          </div>

          <div className="col-lg-8 col-xl-9">
            <section className="course-list">
              <div className="list-header">
                <p>{filteredCourses.length} Hasil</p> 
              </div>

              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => {
                  const isPurchased = purchasedIds.includes(course.id);

                  return (
                    <div className="course-card" key={course.id}>
                      <div className="card-left">
                        <Image 
                          src={course.image} 
                          alt={course.title} 
                          width={1920} height={1080}
                          style={{ width: '100%', height: 'auto' }}
                        />
                        <span className="price">
                          {course.price === 0 ? 'Gratis' : `Rp${course.price.toLocaleString('id-ID')}`}
                        </span>
                      </div>
                      <div className="card-right">
                        <div className="course-info">
                          <h4>{course.title}</h4>
                          <p className="description">{course.description}</p>
                          <p className="instructor">{course.instructor}</p>
                          <div className="meta-info">
                            <span>{course.level}</span><span>•</span><span>{course.videoCount} Video</span>
                          </div>
                        </div>
                        <div className="buttons">
                          <Link href={course.slug} className="btn btn-card">Lihat</Link>
                          
                          {/* 4. TAMPILKAN TOMBOL SESUAI STATUS PEMBELIAN */}
                          {isPurchased ? (
                            <button 
                              className="btn btn-card" 
                              style={{ 
                                backgroundColor: '#6c757d', 
                                borderColor: '#6c757d', 
                                cursor: 'default',
                                opacity: 0.8
                              }} 
                              disabled
                            >
                              ✓ Terdaftar
                            </button>
                          ) : (
                            <Link href={`/pembayaran?id=${course.id}`} className="btn btn-card">
                              Beli
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-center text-dark fs-5 mt-5">
                  Maaf, tidak ada kursus yang sesuai dengan filter Anda.
                </p>
              )}
              
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}