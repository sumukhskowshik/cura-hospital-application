import { useState } from 'react';
import { auth, db } from '../lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export function AuthCard({ onSuccess }: { onSuccess?: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Update user profile in Firebase Auth
        await updateProfile(user, { displayName: name });
        
        // Store user data in Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          createdAt: serverTimestamp()
        });
      }
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
        {isLogin ? 'Welcome Back' : 'Create an Account'}
      </h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-slate-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-slate-50"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700">Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-slate-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-slate-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full py-2 px-3 border border-slate-300 rounded-xl focus:ring-primary-500 focus:border-primary-500 bg-slate-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
        </button>
      </div>
    </div>
  );
}
