import Edusource from "../../models/edusource.model.js";

export async function searchEdusources(search, page, pageSize) {
    const edusources = await Edusource.aggregate([
        { $match: search },
        {
            $lookup: {
                from: 'users',                // Colección a unir (usuarios)
                localField: 'creatorId',      // Campo en Edusource que referencia al usuario
                foreignField: '_id',          // Campo en User que coincide con creatorId
                as: 'creator',                // Nombre del nuevo array que contendrá los documentos unidos
            }
        },
        { $unwind: '$creator' },
        {
            $sort: {
                'creator.karma': -1,
                'valorationsAverage.average': -1
            }
        },
        { $skip: (page - 1) * pageSize },
        { $limit: pageSize },
        { $project: { creator: 0, } }
    ]);
    const totalCount = await Edusource.countDocuments(search);
    const totalPages = Math.ceil(totalCount / pageSize);

    return { edusources, totalCount, totalPages }
}