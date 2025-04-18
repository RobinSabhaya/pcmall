const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { User, Admin } = require('../models');
const config = require('./config');
const { TOKEN_TYPES, ROLES } = require('../helper/constant.helper');

const jwtOptions = {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
    try {
        if (payload.type !== TOKEN_TYPES.ACCESS) {
            throw new Error('Invalid token type');
        }

        let user;
        if ([ROLES.sub_admin, ROLES.super_admin].includes(payload.role)) {
            user = await Admin.findOne({ _id: payload.sub, deletedAt: null }).populate('role');
        } else if ([ROLES.pet_parent, ROLES.breeder, ROLES.user].includes(payload.role)) {
            user = await User.findOne({ _id: payload.sub, deletedAt: null });
        }

        if (!user) {
            return done(null, false);
        }
        done(null, user);
    } catch (error) {
        done(error, false);
    }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

module.exports = {
    jwtStrategy,
};
