// // 'use client';

// // import LoginForm from "@/src/components/LoginForm";
// // import { useUserStore } from "@/src/store/useUserStore";
// // import { useRouter } from 'next/navigation';
// // import { useEffect, useState } from 'react';
// // import LoadingSpinner from '@/src/components/common/LoadingSpinner';

// // export default function LoginPage() {
// //   const { isLoggedIn } = useUserStore();
// //   const router = useRouter();
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     setLoading(false);
// //     if (isLoggedIn) {
// //       router.replace('/');
// //     }
// //   }, [isLoggedIn, router]);

// //   if (loading) return <LoadingSpinner />;

// //   return <LoginForm />;
// // }


// // src/app/login/page.tsx
// 'use client'

// import { useState } from 'react'
// import { useLogin } from '@/hooks/useAuth'
// import Button from '@/components/ui/Button/Button'
// import { cn } from '@/lib/utils'
// import styles from './page.module.scss'

// export default function LoginPage() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   })
//   const [error, setError] = useState('')
  
//   const loginMutation = useLogin()

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError('')

//     try {
//       await loginMutation.mutateAsync(formData)
//     } catch (err: any) {
//       setError(err?.message || '로그인에 실패했습니다')
//     }
//   }

//   const handleInputChange = (field: string, value: string) => {
//     setFormData(prev => ({ ...prev, [field]: value }))
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.card}>
//         <h1 className={styles.title}>로그인</h1>
        
//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.field}>
//             <label>이메일</label>
//             <input
//               type="email"
//               value={formData.email}
//               onChange={(e) => handleInputChange('email', e.target.value)}
//               required
//               className={styles.input}
//             />
//           </div>

//           <div className={styles.field}>
//             <label>비밀번호</label>
//             <input
//               type="password"
//               value={formData.password}
//               onChange={(e) => handleInputChange('password', e.target.value)}
//               required
//               className={styles.input}
//             />
//           </div>

//           {error && <div className={styles.error}>{error}</div>}

//           <Button
//             type="submit"
//             variant="primary"
//             loading={loginMutation.isPending}
//             className={styles.submitButton}
//           >
//             로그인
//           </Button>
//         </form>
//       </div>
//     </div>
//   )
// }
