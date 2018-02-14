To make unit testing run:
	install jasmine:
		npm install jasmine --save
	install jasmine @types:
		npm install @types/jasmine --save
    add tsconfig.json
		{
		  "compileOnSave": true,
		  "compilerOptions": {
			"noImplicitAny": false,
			"noEmitOnError": true,
			"removeComments": false,
			"sourceMap": true,
			"target": "es5"
		  },
		  "exclude": [
			"node_modules"
		  ],
		  "typeRoots": [
			"./node_modules/@types"
		  ],
		  "types": [
			"jasmine"
		  ]
		}
	add SimpleJasmineTests.ts
		describe("tests/SimpleJasmineTests.ts ", () => {
			it("should passed", () => {
				let undefinedValue="test5";
				expect(undefinedValue).toBe("test5");
			});
		});
	add page for running test, for example, SpecRunner.html
		<html>
		<head>
			<link rel="stylesheet" type="text/css"
				  href="./node_modules/jasmine-core/lib/jasmine-core/jasmine.css" />
			<script type="text/javascript"
					src="./node_modules/jasmine-core/lib/jasmine-core/jasmine.js">

			</script>
			<script type="text/javascript"
					src="./node_modules/jasmine-core/lib/jasmine-core/jasmine-html.js" >
			</script>
			<script type="text/javascript"
					src="./node_modules/jasmine-core/lib/jasmine-core/boot.js">

			</script>
			<script type="text/javascript"
					src="./SimpleJasmineTests.js">
			</script>
		</head>
		<body>
		</body>
		</html> 

