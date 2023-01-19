import React from "react";
import renderer from "react-test-renderer";
import Dashboard from "../Dashboard";

const posts = [
    {
        "id": "post63c92774936de_6efc5692",
        "from_name": "Isidro Schuett",
        "from_id": "user_16",
        "message": "dead press adoption inn thin thumb horseshoe uncle seed inquiry heal bay climate freedom slap thoughtful queen company acquisition abuse squash pattern peasant condition export assessment raid helmet linen water flat dirty fling chord correction ethics murder reconcile virgin letter swallow bullet norm experiment damage dirty gravel manage refuse refuse tap velvet relax provide line speculate bend traction tired transport charter delay pick notice lion coincide initiative modernize option bake risk popular delete roar beer agreement debt tumour lie stress key glow lot reconcile patch fountain competition allocation eject golf south belly corn lion golf trench mug carry relation kinship",
        "type": "status",
        "created_time": "2023-01-19T05:23:14+00:00"
    },
    {
        "id": "post63c92774936f7_0e182cd4",
        "from_name": "Quyen Pellegrini",
        "from_id": "user_19",
        "message": "mess money hate conductor company duck indulge fly seller neighborhood rush message flush empire upset due climate opposition virgin shy dimension tolerate horror wagon run accumulation huge complex mother resource core era cash",
        "type": "status",
        "created_time": "2023-01-19T01:23:00+00:00"
    },
    {
        "id": "post63c92774936fe_8f164a11",
        "from_name": "Lael Vassel",
        "from_id": "user_0",
        "message": "leaflet execute systematic corn avenue porter attention kit horseshoe trench constitution canvas representative fill nest racism occasion crystal resign lake umbrella revolution tile snack cottage carve mess accountant tired faithful aluminium competition follow variant button basket advice withdrawal bury",
        "type": "status",
        "created_time": "2023-01-18T19:43:34+00:00"
    },
];

describe("renders Dashboard", () => {
    test("matches snapshot", () => {
        const tree = renderer.create(<Dashboard posts={posts} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
