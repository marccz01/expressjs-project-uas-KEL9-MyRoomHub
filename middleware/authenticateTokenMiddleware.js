import jwt from "jsonwebtoken"

export const authenticateTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({
            error: "No Token provided", 
        });
    }

    //Format token biasanya "Bearer [TOKEN]", ambil elemen kedua 
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).send({
            error: "Invalid token",
        });
    }

    jwt.verify(token, "APP_JWT_SECRET", (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: "Invalid token",
                details: err.message,
            });
        }

        //Menyimpan data user yang terdekripsi ke dalam object request
        req.user = decoded;
        next();
    });
}

// exports.verifyToken = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   if (!token) return res.status(401).json({ message: 'No token' });

//   const decoded = jwt.verify(token, 'SECRET_KEY');
//   req.user = decoded; // { id, role }

//   next();
// };

// exports.isAdmin = (req, res, next) => {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Akses ditolak' });
//   }
//   next();
// };