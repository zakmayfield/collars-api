import { GraphQLError } from 'graphql';
export const applyTakeConstraints = (params) => {
    if (params.value < params.min || params.value > params.max) {
        throw new GraphQLError(`'take' argument value '${params.value}' is outside the valud range of ${params.min} to ${params.max}`);
    }
    return params.value;
};
export const applySkipConstraints = (params) => {
    if (params.value < params.min || params.value > params.max) {
        throw new GraphQLError(`'skip' argument value '${params.value}' is outside the valud range of ${params.min} to ${params.max}`);
    }
    return params.value;
};
