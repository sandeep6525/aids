const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_super_secret_key_here');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid or expired token.' });
  }
};

const requireRole = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'You do not have permission to perform this action.' });
    }
    next();
  };
};

// Simplified permission structure for RBAC Phase 3
const ROLE_PERMISSIONS = {
  SUPER_ADMIN: ['*'], // All permissions
  HOD: [
    'MANAGE_DEPARTMENT', 'MANAGE_FACULTY', 'MANAGE_ACADEMICS', 'MANAGE_EVENTS',
    'MANAGE_ANNOUNCEMENTS', 'MANAGE_ACHIEVEMENTS', 'MANAGE_PLACEMENTS', 'MANAGE_PROJECTS',
    'MANAGE_RESEARCH', 'MANAGE_GALLERY', 'MANAGE_ALUMNI', 'MANAGE_DOWNLOADS',
    'MANAGE_RECRUITERS', 'VIEW_MESSAGES', 'MANAGE_SETTINGS'
  ],
  FACULTY: [
    'REVIEW_ACHIEVEMENTS', 'MANAGE_ASSIGNED_PROJECTS', 'SUBMIT_RESEARCH', 'MANAGE_AUTHORIZED_EVENTS'
  ]
};

const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Access denied.' });
    }

    const userPermissions = ROLE_PERMISSIONS[req.user.role] || [];
    
    if (userPermissions.includes('*') || userPermissions.includes(permission)) {
      return next();
    }

    return res.status(403).json({ success: false, message: 'You do not have permission to perform this action.' });
  };
};

module.exports = {
  authenticateToken,
  requireRole,
  requirePermission
};
